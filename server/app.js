import express from "express";
import api from "./routes/api.js";
import path from "path";
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const users = [];

let app = express();
let sessionHandler = session({
  //used to sign the session id, maxAge is the time in ms
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
});

app.use(express.static("client/build"))


/**
 * for parsing the POST application/json
 */
app.use(express.json());

/**
 * api router
 */
app.use("/api", api);

/**
 * Athentication post
 */
app.post("/auth", sessionHandler, async (req, res) => {
  //TODO: should validate that the token was sent first
  const { token } = req.body;
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
  const user = { "name": name, "email": email, "picture": picture };
  const existsAlready = users.findIndex(elem => elem.email === email);

  if (existsAlready < 0) {
    //insert
    users.push(user);
  } else {
    //update
    users[existsAlready] = user;
  }
  //TODO: create a session cookie send it back to the client
  req.session.regenerate(function (err) {
    if (err) {
      //server error, couldn't create the session
      return res.sendStatus(500);
    }
    //store the user's info in the session

    req.session.user = user;
    res.json({ user: user });
  });
});

/**
 * route to the server that will require authentication
 * middleware to verify the session
 */
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    //unauthorized
    return res.sendStatus(401);
  }
  next();
}

/**
 * route for authenticated users only
 */
app.get("/protected", sessionHandler, isAuthenticated, function (req, res) {
  console.log("from the /protected ");
  console.log(req.session.user);
  //would actually be doing something
  res.sendStatus(200);
});

/**
 * logout route
 */
app.get("/logout", sessionHandler, isAuthenticated, function (req, res) {
  //destroy the session
  req.session.destroy(function (err) {
    //callback invoked after destroy returns
    if (err) {
      //server error, couldn't destroy the session
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    res.sendStatus(200);
  });
});


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




app.use((req, res) => {
  res.sendStatus(404);
});

export default app;