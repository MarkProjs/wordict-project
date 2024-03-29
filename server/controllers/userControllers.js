import { Users } from "../db/db.js";


/**
 * get one users data
 * @param {Object} user the target user
 * @async
 * @returns {Object} the user's data
 */
async function getUserInfo(user) {
  let query = {email: user.email};
  return await Users.getUserData(query);
}
/**
 * gets favortie words of user
 * @param {Object} user target user
 * @async
 * @returns {Array} the favorite words of th euser
 */
async function getUserFavorites(user){
  let query = {email: user.email};
  return Users.getUserFavorites(query);
}
/**
 * Get all users
 * @async
 * @returns all users sorted by Elo
*/
async function getAllUsers() {
  let result = await Users.getAllUsersForLeaderboard();
  return result;
}
 
/**
 * Post user elo
 * @param {Object} user the target user
 * @async
 * @param {Int} elo New calculated elo of the user
 */
async function updateElo(user, elo) {
  await Users.updateUserElo(user.email, elo);
}
/**
 * Update user picture
 * @param {Object} user the target user
 * @async
 * @param {String} picture New calculated elo of the user
 */
async function updatePicture(user, picture) {
  await Users.updatePicture(user.email, picture);
}
// TODO remove log
/**
 * update the user document with provided data
 * @async
 * @param {Object} user target user
 * @param {String} newName newName
 */
async function updateName(user, newName) {
  await Users.findOneAndUpdate(
    { email: user.email },
    { name: newName },
    // { picture: picture},
    // If `new` isn't true, `findOneAndUpdate()` will return the
    // document as it was _before_ it was updated.
    { new: false }
  );
}
/**
 * update the user's favorite words
 * isFavorites indicated if the word was a favorite prior to the call
 * @param {String} user target user
 * @param {String} word new word
 * @param {Boolean} isFavorite true: remove from favorites, false: add to favorites
 */
async function postUserFavoriteWord(user, word, isFavorite) {
  //TODO remove logs
  if (!isFavorite) {
    console.log(`add ${word} to favorites`);
    await Users.addUserFavoriteWord(user.email, word);
  } else {
    console.log(`remove ${word} to favorites`);
    await Users.removeUserFavoriteWord(user.email, word);
  }
}
/**
 * NOTE: currently not used
 * Uptade user favorite
 * @async
 * @param {Object} user the target user
 * @param {Array} favoriteWords New calculated elo of the user
 */
async function updateFavorites(user, favoriteWords) {
  await Users.updateFavorites(user.email, favoriteWords);
}
/**
 * add a user if they dont already exist
 * @param {Object} newUser 
 */
async function addUserIfNew(newUser){
  let alreadyExists = await getUserInfo(newUser);
  if(!alreadyExists){
    const newWord = new Users({
      email: newUser.email,
      name: newUser.name,
      picture: newUser.picture,
      favoriteWords: [],
      elo: 0
    });
    await newWord.save();
  }
}
export default {addUserIfNew, getUserInfo, getAllUsers, updateElo,
  updatePicture, updateFavorites, updateName, postUserFavoriteWord, getUserFavorites};