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
  let words = [{ "word": "monkey" }, { "word": "evolution" }, { "word": "stick" },
    { "word": "rock" }];

  if (req.query.length !== undefined) {
    // Retrieve data from MongoDB
    words = await controllers.getAllWords(parseInt(req.query.length));
  } else {
    console.log("all words no matter length");
  }
  res.json(words);
})

export default router;