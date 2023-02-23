import express from "express";

const router = express.Router();

/**
 * Get API to retrieve Definition
 */
router.get("/:word/definition", async (req, res) => {
  // const word = req.query.word

  // Mock Data
  let data = {
    "word": "monkey",
    "definitions": [
      "a small to medium-sized primate that typically has a long tail, most kinds of which live in trees in tropical countries.",
      "a pile-driving machine consisting of a heavy hammer or ram working vertically in a groove."
    ]
  };
  // Retrieve data from MongoDB

  res.json(data);
})

/**
 * Get API to retrieve Dictionary
 */
// router.get("/dictionary/:length?", async (req, res) => {
router.get("/dictionary", async (req, res) => {
  let words = [{ "word": "monkey" }, { "word": "evolution" }, { "word": "stick" }, { "word": "rock" }];

  // if (req.query.word !== undefined){
  //   words = words.filter(word => word.word.length >= req.query.word.length);
  // }
  // Retrieve data from MongoDB
  // let words = db.getAllWords();
  res.json(words);
})

export default router;