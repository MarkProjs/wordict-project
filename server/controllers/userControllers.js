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
 * update the user document with provided data
 * @async
 * @param {String} email 
 * @param {String} name 
 * @param {String} picture 
 */
async function updateUser(email, name) {
  const doc = await Users.findOneAndUpdate(
    { email: email },
    { name: name },
    // { picture: picture},
    // If `new` isn't true, `findOneAndUpdate()` will return the
    // document as it was _before_ it was updated.
    { new: false }
  );
  console.log(`user ${doc.email} has been updated`);
}

/**
 * update the user's favorite words
 * @param {String} email 
 * @param {String} word 
 * @param {boolean} isFavorite true: remove from favorites, false: add to favorites
 */
async function postUserFavoriteWord(email, word, isFavorite) {
  if (!isFavorite) {
    console.log(`add ${word} to favorites`);
    await Users.addUserFavoriteWord(email, word);
  } else {
    console.log(`remove ${word} to favorites`);
    await Users.removeUserFavoriteWord(email, word);
  }
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
  updatePicture, updateFavorites, updateUser, postUserFavoriteWord};