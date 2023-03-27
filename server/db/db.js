import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//supresses warning
mongoose.set('strictQuery', true); 


const dbUrl = process.env.ATLAS_URI;


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
  length: Number,
  definitions: [DefinitionSchema],
  rhymes: {
    type: [{}],
    default: []
  },
  synonyms: {
    type: [{}],
    default: []
  }
});

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  favoriteWords: [{ type: String }],
  elo: Number
});

/**
 * @async
 * @param {Number} randValue random number of documents to skip
 * @param {Object} query query object of the form {field: value}
 * @returns a word that matches the query, selected based on the randomValue
 */
wordSchema.statics.getRandomUsingVal = async function(randValue, query = {}){
  return await Words.findOne(query).skip(randValue).exec();
}

/**
 * @async
 * @returns {Array} and array with all the words represented in the form {word: word};
 */
wordSchema.statics.getOnlyWordFields =  async function(query = {}){
  return await Words.find(query).select('word -_id').exec();
}

wordSchema.pre('save', function (next) {
  this.length = this.get('word').length;
  next();
});

/**
 * Temporary function just to test with profile page
 * @async
 * @returns the latest user
 */
userSchema.statics.getLatestUser = async function (){
  return await Users.find().sort({_id:-1}).limit(1).exec();
};

/**
 * Add a new word to the user's favorite words array
 * @param {String} email 
 * @param {String} newWord 
 */
userSchema.statics.updateUserFavoriteWords = async function (email, newWord) {
  await Users.updateOne(
    { email: email },
    { $push: { favoriteWords: newWord } }
  );
}

const Words = mongoose.model('WordsV3', wordSchema);
const Users = mongoose.model('Users', userSchema);
console.log("Schemas made");
console.log("Connect to DB to interact")

// if server goes down db automatically closes
process.on("SIGINT", async () => {
  await disconnect();
  process.exit();
});



async function connect(){
  await mongoose.connect(dbUrl);
  console.log("Connected to database");
  console.log("Ready to interact with DB");
}
/**
 * disconnect from the databse
 * @void
 * @async
 */
async function disconnect(){
  await mongoose.disconnect();
  console.log("Disconnected from Database.");
}

// TESTS 

//await test()
// eslint-disable-next-line no-unused-vars
async function test(){
  await Words.deleteMany({});
  const newWord = new Words({
    word: "three",
    definitions: [
      {
        type: "n.",
        definition: "lucifer bro"
      },
      {
        type: "v.",
        definition: "stuff"
      }
    ]
  });
  await newWord.save();


  //console.log(await Words.getOnlyWordFields());
  console.log("Saved");

  await mongoose.disconnect();
}

// END TEST

export {
  disconnect, connect, Words, Users
};