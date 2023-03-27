
/**
 * Fetch the definition data of a given word
 * @param {String} word The word to search from our api
 * @returns the data of the word (definitions, etc.) or null if the word does not exist.
 */
async function fetchDefinition(word) {
  let url = new URL(`/api/${word.toLowerCase()}/definition`, location.origin);
  let data;
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (e) {
    data = null;
  }
  return data;
}

/**
 * Get all words of a given length from our api
 * @param {int} length The length of the words to get
 * @returns A list of all words that have that length or an empty array if none are found
 */
async function fetchAllWords(length = undefined) {
  let words;
  let url = new URL(`/api/dictionary`, location.origin);
  if (length) {
    url.searchParams.set("length", length);
  }
  try {
    let response = await fetch(url);
    words = await response.json();
  } catch (e) {
    words = [];
  }
  return words;
}

/**
 * Get a user object from api
 * @returns An object containing a user's data (name, image, etc.) or an empty object
 */
async function fetchUser() {
  let url = new URL("/api/user", location.origin);
  let data;
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (e) {
    data = {};
  }
  return data;
}

/**
 * Update a user using api
 * @param {JSON} data 
 */
async function updateUser(data) {
  let url = new URL("/api/profile-update", location.origin);
  await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: data,
  });
}

/**
 * Update a user's favorite words using api
 * @param {JSON} data 
 */
async function updateUserFavoriteWords(data) {
  let url = new URL("/api/update-favorites", location.origin);
  await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: data,
  });
}

export default {
  fetchDefinition,
  fetchAllWords,
  fetchUser,
  updateUser,
  updateUserFavoriteWords,
}
