import express from "express";
import fs from 'fs';
import controllers from "../controllers/controllers.js";

const router = express.Router();

/**
 * middleware function to log the duration of each API call
 */
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const row = `${method}, ${originalUrl}, ${duration} \n`;
    const title = `Method, URL, Duration(ms) \n`;
    fs.appendFile('log.csv', row, (err) => {
      if (err) {
        console.error(err);
      }
    });

    //check if the file exists and add title if not
    if (!fs.existsSync('log.csv')) {
      fs.writeFile('log.csv', title, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
  next();
}

/**
 * use the logger function to record the api call duration
 */
router.use(logger);


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

router.post("/profileUpdate", async (req, res) => {
  // const file = req.files.file;
  console.log(req);
  const email = req.body.email;
  const name = req.body.username;
  if(!email || !name){
    res.sendStatus(400).end();
  }else {
    try{
      await controllers.updateUser(email, name);
      res.sendStatus(200).end();
    }catch(e){
      console.error(e);
      res.sendStatus(500).end();
    }
  }
  // return res.json({success: true});
})

export default router;