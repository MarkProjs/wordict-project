
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
    data = {user: {}};
  }
  return data;
}

/**
 * Get all users from api
 * @returns Array containing all users
 */
async function fetchAllUsers() {
  let url = new URL("/api/all-users", location.origin);
  let data;
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (e) {
    data = [];
  }
  return data;
}

async function fetchPostElo(data) {
  let url = new URL("/api/user-elo", location.origin);
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
  catch (e) {
    console.log(e);
  }
}

/**
 * login of the google authentication
 */
async function handleLogin(googleData) {
  let url = new URL("/auth", location.origin);
  let data;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ token: googleData.credential }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    data = await res.json();
  } catch(e) {
    data = {user: {}};
  }

  return data;
}

/**
 * logging out of the authentication
 */
async function handleLogout() {
  let url = new URL("/logout", location.origin);
  try {
    await fetch(url);
  }
  catch (e) {
    console.log(e);
  }
  
}

export default {
  fetchDefinition,
  fetchAllWords,
  fetchUser,
  fetchAllUsers,
  fetchPostElo,
  handleLogin,
  handleLogout
}
