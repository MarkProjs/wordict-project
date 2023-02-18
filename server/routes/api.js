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

export default router;