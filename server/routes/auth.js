import express from "express";
import userControllers from "../controllers/userControllers.js";
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import imageUpload from "../controllers/blobController.js";
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);



const router = express.Router();
let sessionHandler = session({
  //used to sign the session id, maxAge is the time in ms
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 3600000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
});


//middleware for the upload file
router.use(fileUpload({
  createParentPath: true,
}));


router.use(express.json());

router.use(sessionHandler);

/**
 * Authentication post
 */
router.post("/login", async (req, res) => {
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

  const user = { "name": name, "email": email, "picture": picture };
  await userControllers.addUserIfNew(user);

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
 * NOTE: not currently in use
 * check if the user is logged in
 */
router.get("/logged-in-check", isAuthenticated, (req, res) => {
  res.sendStatus(200).end();
});

/**
 * POST API to update user elo
 */
router.post("/update-elo", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  const elo = req.body.elo;
  if (!elo) {
    return res.sendStatus(400).end()
  }
  try {
    await userControllers.updateElo(user, elo);
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

/**
 * POST API to update user favorites
 */
router.post("/update-favorites", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  const word = req.body.word;
  const isFavorite = req.body.favorite;
  if (isFavorite === undefined || !word) {
    return res.sendStatus(400).end();
  }
  try {
    // Update user favorite words in database
    await userControllers.postUserFavoriteWord(user, word, isFavorite);
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

/**
 * Post API to update User's name
 */
router.post("/update-name", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  const newName = req.body.name;
  if (!newName) {
    return res.sendStatus(400).end();
  } else {
    try {
      // Update user's name in database
      await userControllers.updateName(user, newName);
      res.sendStatus(200).end();
    } catch (e) {
      console.error(e);
      res.sendStatus(500).end();
    }
  }
});

/**
 * POST API to update user picture
 */
router.post("/update-picture", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  const file = req.files.file;
  if (!file) {
    return res.sendStatus(400).end()
  }
  try {
    const pictureUrl = await imageUpload(file);
    await userControllers.updatePicture(user, pictureUrl);
    res.sendStatus(200).end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

/**
 * Get API to retrieve User
 */
router.get("/get-user-info", isAuthenticated, async (req, res) => {
  let user = req.session.user;
  try {
    user = await userControllers.getUserInfo(user);
    res.json(user).end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

/**
 * Get API to retrieve Uses's favorites
 */
router.get("/get-user-favorites", isAuthenticated, async (req, res) => {
  let user = req.session.user;
  try {
    user = await userControllers.getUserFavorites(user);
    res.json(user).end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

/**
   * logout route
   */
router.get("/logout", isAuthenticated, function (req, res) {
  //destroy the session
  req.session.destroy(function (err) {
    console.log("Destroying Session")
    //callback invoked after destroy returns
    if (err) {
      //server error, couldn't destroy the session
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    res.sendStatus(200);
  });
});


export default router;