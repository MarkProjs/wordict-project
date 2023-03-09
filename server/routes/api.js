import express from "express";
import controllers from "../controllers/controllers.js";
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const users = new Array();

/**
 * for parsing the POST application/json
 */
router.use(express.json());



/**
 * use the session middleware
 */
router.use(session({
  //used to sign the session id, maxAge is the time in ms
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: null,
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

/**
 * Athentication post
 */
router.post("/auth", async (req, res) => {
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
router.get("/protected", isAuthenticated, function (req, res) {
  //would actually be doing something
  res.sendStatus(200);
});

/**
 * logout route
 */
router.get("/logout", isAuthenticated, function (req, res) {
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

/**
 * Get API to retrieve Definition
 */
router.get("/:word/definition", async (req, res) => {
  const word = req.params.word
  // Retrieve data from MongoDB
  let data = await controllers.getDefinition(word);
  if (data === null) {
    res.sendStatus(404);
  } else {
    res.json(data);
  }
})

/**
 * Get API to retrieve Dictionary
 */
router.get("/dictionary", async (req, res) => {
  let words;
  // try {
  // Retrieve words from MongoDB
  let data = await controllers.getAllWords(req.query.length);
  words = data.words;
  // } catch (e) {
  //   words = [];
  // }
  res.json(words);
})

export default router;