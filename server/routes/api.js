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