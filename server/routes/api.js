import express from "express";

const router = express.Router();

/**
 * Get API to retrieve Definition
 */
router.get("/:word/definition", async (req, res) => {
  // const word = req.query.word

  let data = {"word": "monkey"};
  // Retrieve data from MongoDB

  res.json(data);
})

/**
 * Get API to retrieve Dictionary
 */
router.get("/dictionary", async (req, res) => {
  let words = [{"word": "monkey"}, {"word": "evolution"}, {"word": "stick"}, {"word": "rock"}];
  // Retrieve data from MongoDB
  // let words = db.getAllWords();
  res.json(words);
})

export default router;