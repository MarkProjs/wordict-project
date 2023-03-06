import express from "express";
import api from "./routes/api.js";
import path from "path";
import OAuth2Client from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

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
  //TODO: may want to update and insert the uer's name, email and picture in the db
  //TODO: create a session cookei send it back to the client
});

app.use((req, res) => {
  res.sendStatus(404);
});

export default app;