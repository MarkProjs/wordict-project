import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//supresses warning
mongoose.set('strictQuery', true); 


const dbUrl = process.env.ATLAS_URI;
try{
  await mongoose.connect(dbUrl);
  console.log("Connected to database");
}catch(err){
  console.error(err);
}
//create schemas
const DefinitionSchema = new mongoose.Schema({
  type: String,
  definition: String
});

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    unique: true
  },
  length: {
    type: Number,
    set: function() {
      return this.word.length
    }
  },
  definitions: [DefinitionSchema],
  rhymes: [{}],
  synonyms: [{}]
});


const Words = mongoose.model('WordsV3', wordSchema);
console.log("Schemas made");
console.log("Ready to interact with DB");

// if server goes down db automatically closes
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Disconnected from Database.");
  process.exit();
});



// TESTS 

await test()
async function test(){
  Words.deleteMany({});
  const newWord = new Words({
    word: "rum",
    length: "",
    definitions: [
      {
        type: "n.",
        definition: "A queer or odd person or thing; a country parson."
      }
    ],
    rhymes: [],
    synonyms: []
  });
  await newWord.save();
  console.log("Saved");

  console.log(await getWordsWithoutDefinitions());

  await mongoose.disconnect();
}

// END TEST

/**
 * disconnect from the databse
 * @void
 * @async
 */
async function disconnect(){
  await mongoose.disconnect();
}
/**
 * @async
 * @param {Object} query query object of the form {field: value}
 * @returns {Number} count of all the words that match the query
 */
async function getCountOfWordsWithQuery(query){
  return await Words.count(query);
}
/**
 * @async
 * @param {Object} query query object of the form {field: value}
 * @returns the found document
 */
async function getWordWithQuery(query){
  return await Words.findOne(query);
}
/**
 * @async
 * @param {Number} randValue random number of documents to skip
 * @param {Object} query query object of the form {field: value}
 * @returns a word that matches the query, selected based on the randomValue
 */
async function getRandomWordWithQuery(randValue, query){
  return await Words.findOne(query).skip(randValue).exec();
}
/**
 * @async
 * @returns {Array} and array with all the words represented in the form {word: word};
 */
async function getWordsWithoutDefinitions(){
  return await Words.find().select('word -_id').exec();
}


export default {
  disconnect, getCountOfWordsWithQuery,
  getRandomWordWithQuery, getWordWithQuery,
  getWordsWithoutDefinitions
};