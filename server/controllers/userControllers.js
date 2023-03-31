import { Users } from "../db/db.js";


/**
 * get one users data
 * @param {Object} user the target user
 * @async
 * @returns the user
 */
async function getUserInfo(user) {
  let query = {email: user.email};
  let result = await Users.findOne(query);
  return result;
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
 * @param {String} elo New calculated elo of the user
 */
async function updatePicture(user, picture) {
  await Users.updatePicture(user.email, picture);
}
/**
 * Uptade user favorite
 * @async
 * @param {Object} user the target user
 * @param {Array} elo New calculated elo of the user
 */
async function updateFavorites(user, favoriteWords) {
  await Users.updateFavorites(user.email, favoriteWords);
}
async function addUserIfNew(newUser){
  let alreadyExists = getUserInfo(newUser);
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
    

export default {addUserIfNew, getUserInfo, getAllUsers, updateElo, updatePicture, updateFavorites};