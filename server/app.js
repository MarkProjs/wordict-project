import express from "express";
import api from "./routes/api.js";
import path from "path";
import OAuth2Client from 'google-auth-library';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const users = new Array();

let app = express();

app.use(express.static("client/build"))

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
  //TODO: may want to update and insert the uer's name, email and picture in the db.
  //For now I will be using an array that is on top of the app.js
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
});

app.use(session({
  //used to sign the session id
  secret: process.env.SECRET, 
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120000,
    secure: secure,
    httpOnly: true,
    sameSite: 'strict'
  }
}));
app.use((req, res) => {
  res.sendStatus(404);
});

export default app;