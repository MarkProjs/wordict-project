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
  let words = [];
  let data;
  if (req.query.length !== undefined) {
    // Retrieve words from MongoDB matching given length param
    data = await controllers.getAllWords(req.query.length);
  } else {
    // Retrieve all words from MongoDB
    data = await controllers.getAllWords();
  }
  words = data.words;
  res.json(words);
})

export default router;