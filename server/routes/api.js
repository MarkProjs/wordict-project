import express from "express";
import controllers from "../controllers/controllers.js";

const router = express.Router();

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

/**
 * Get API to retrieve User
 */
router.get("/user", async (req, res) => {
  let user;
  try {
    user = await controllers.getUser();
  } catch (error) {
    user = {}
  }
  res.json(user);
});

export default router;