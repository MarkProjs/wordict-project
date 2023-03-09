import express from "express";
import api from "./routes/api.js";
import path from "path";
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const users = new Array();

let app = express();

app.use(express.static("client/build"))

//for parsing the POST application/json
app.use(express.json());

app.use("/api", api);

function html(req, res, next) {
  if (req.accepts("html")) {
    next();
  } else {
    next("route");
  }
}

app.get("*", html, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});


app.post("/auth", async (req, res)=> {
  //TODO: should validate that the token was sent first
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
  });
  if (!ticket) {
    return res.sendStatus(401);
  }
  const { name, email, picture } = ticket.getPayload();
  //TODO: may want to update and insert the user's name, email and picture in the db.
  //For now I will be using an array, as a mock data that is on top of the app.js
  const user = {"name": name, "email": email, "picture": picture};
  const existsAlready = users.findIndex( elem => elem.email === email);

  if (existsAlready < 0) {
    //insert
    users.push(user);
  } else {
    //update
    users[existsAlready] = user;
  }
  //TODO: create a session cookie send it back to the client
  req.session.regenerate(function(err) {
    if(err) {
      //server error, couldn't create the session
      return res.sendStatus(500); 
    }
    //store the user's info in the session
    req.session.user = user;
    res.json({user: user});
  });
});

//use the session middleware, expires after 20 minutes
app.use(session({
  //used to sign the session id, maxAge is the time in ms
  secret: process.env.SECRET, 
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120000,
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

//route to the server that will require authentication
//middleware to verify the session
function isAuthenticated(req, res, next) {
  if(!req.session.user) {
    //unauthorized
    return res.sendStatus(401);
  }
  next();
}

//route for authenticated users only
app.get("/protected", isAuthenticated, function(req, res){
  //would actually be doing something
  res.sendStatus(200);
});

//logout route
app.get("/logout", isAuthenticated, function(req, res) {
  //destroy the session
  req.session.destroy(function(err) {
    //callback invoked after destroy returns
    if (err) {
      //server error, couldn't destroy the session
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    res.sendStatus(200);
  });
});


app.use((req, res) => {
  res.sendStatus(404);
});

export default app;