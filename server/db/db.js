import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//suppresses warning
mongoose.set('strictQuery', true); 


const dbUrl = process.env.ATLAS_URI;


// WORD STRUCTURE

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
 * @returns {Array} an array with all the words represented in the form {word: word};
 */
wordSchema.statics.getOnlyWordFields =  async function(query = {}){
  const cursor = Words.find(query).select('word -_id')
  if (query.word) {
    return await cursor.limit(10);
  } 
  return await cursor.exec();
}

wordSchema.pre('save', function (next) {
  this.length = this.get('word').length;
  next();
});


//USER STRUCTURE

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  picture: String,
  favoriteWords: [String],
  elo: Number
});


/**
 * Get all users sorted by elo
 * @async
 */
userSchema.statics.getAllUsersForLeaderboard = async function () {
  return await Users.find().select('name elo -_id').sort('-elo')
}

/**
 * Update User Elo
 * @param {String} email email to id user
 * @param {Int} elo new elo
 */
userSchema.statics.updateUserElo = async function (email, elo) {
  await Users.updateOne(
    { email: email },
    { $inc: { elo: elo } }
  )
}

/**
 * Update User Picture
 * @param {String} email email to id user
 * @param {String} picture new picture
 */
userSchema.statics.updatePicture = async function (email, picture) {
  await Users.updateOne(
    { email: email },
    { $set: { picture: picture } }
  )
}

/**
 * Update User Favorites
 * @param {String} email email to id user
 * @param {Array} favoriteWords
 */
userSchema.statics.updateFavorites = async function (email, favoriteWords) {
  await Users.updateOne(
    { email: email },
    { $set: { favoriteWords: favoriteWords } }
  )
}

// userSchema.statics.getLatestUser = async function (){
//   return await Users.find().sort({_id:-1}).limit(1).exec();
// };

/**
 * Add a new word to the user's favorite words array
 * @param {String} email 
 * @param {String} word 
 */
userSchema.statics.addUserFavoriteWord = async function (email, word) {
  await Users.updateOne(
    { email: email },
    { $push: { favoriteWords: word } }
  );
}

/**
 * Remove a word from the user's favorite words array
 * @param {String} email 
 * @param {String} word 
 */
userSchema.statics.removeUserFavoriteWord = async function (email, word) {
  await Users.updateOne(
    { email: email },
    { $pull: { favoriteWords: word } }
  );
}

//init models

const Words = mongoose.model('WordsV3', wordSchema);
const Users = mongoose.model('UsersV2', userSchema);
console.log("Schemas made");
console.log("Connect to DB to interact")

// if server goes down db automatically closes
process.on("SIGINT", async () => {
  await disconnect();
  process.exit();
});

/**
 * connect to the database
 * @void
 * @async
 */
async function connect() {
  await mongoose.connect(dbUrl);
  console.log("Connected to database");
  console.log("Ready to interact with DB");
}
/**
 * disconnect from the database
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