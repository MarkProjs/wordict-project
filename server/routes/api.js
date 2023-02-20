import express from "express";

const router = express.Router();

/**
 * Get API to retrieve Definition
 */
router.get("/:word/definition", async (req, res) => {
  const word = req.query.word

  let data = {"word": "monkey"};
  // Retrieve data from MongoDB

  res.json(data);
})

// at top level
let words;
/* try {
  const db = new DB(); // controller.js, not db
  words = db.getAllWords();
} catch (error) {
  console.error(error);
}*/

/**
 * Get API to retrieve Dictionary
 */
router.get("/dictionary", async (req, res) => {
  words = [{"word": "monkey"}, {"word": "evolution"}, {"word": "stick"}, {"word": "rock"}];
  // Retrieve data from MongoDB

  res.json(words);
})

export default router;