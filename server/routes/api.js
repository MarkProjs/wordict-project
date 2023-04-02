import express from "express";
import userControllers from "../controllers/userControllers.js";
import wordControllers from "../controllers/wordControllers.js";

const router = express.Router();
router.use(express.json());


/**
 * Get API to retrieve Definition
 */
router.get("/:word/definition", async (req, res) => {
  const word = req.params.word
  // Retrieve data from MongoDB
  let data = await wordControllers.getDefinition(word);
  if (data === null) {
    res.sendStatus(404);
  } else {
    res.json(data);
  }
});

/**
 * Get API to retrieve Dictionary
 */
router.get("/dictionary", async (req, res) => {
  let words;
  try {
    // Retrieve words from MongoDB
    let data = await wordControllers.getAllWords(req.query.length);
    words = data.words;
  } catch (e) {
    words = [];
  }
  res.json(words);
});

/**
 * Get API to retrieve all Users
 */
router.get("/all-users", async (req, res) => {
  try {
    let users = await userControllers.getAllUsers();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});


export default router;