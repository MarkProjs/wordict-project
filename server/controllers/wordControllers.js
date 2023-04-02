import { Words } from "../db/db.js"

/**
 * NOTE not currently used
 * @async
 * @param {Number} length the desired length for the random word
 * @returns the random word
 */
async function getRandomWord(length) {
  let query = { length: length };
  let count = await Words.count(query);
  let randVal = Math.floor(Math.random() * count);
  let randomWord = await Words.getRandomUsingVal(randVal, query);
  return randomWord;
}
/**
 * @async
 * @param {String} word the word we want the definition for
 * @returns the object of the word with the definition
 */
async function getDefinition(word) {
  let query = { word: word };
  let result = await Words.findOne(query);
  return result;
}
/**
 * @async
 * @returns an object with a field count for the number of words and a field words
 * that's an array of all the words
 */
async function getAllWords(length, startsWith) {
  let query = {};
  if (length) {
    query.length = length;
  }
  if(startsWith){
    query.word = {$regex: RegExp("^" + startsWith, "i") };
  }
  let returnObj = {};
  let arr = await Words.getOnlyWordFields(query);
  returnObj.words = [];
  arr.forEach(i => {
    returnObj.words.push(i.word);
  });
  returnObj.count = arr.length;
  return returnObj;
}

export default { getRandomWord, getDefinition, getAllWords };
