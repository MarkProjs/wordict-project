
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
    if (response.ok) {
      data = await response.json();
    } else {
      data = null;
    }
  } catch (e) {
    data = null;
  }
  return data;
}

/**
 * NOTE: not currently in use
 * returns true or false based on if the user is logged in on the back end
 * @returns {Boolean} state of login
 */
async function loggedInCheck() {
  let url = new URL('/auth/logged-in-check', location.origin);
  let result = false;
  try {
    let response = await fetch(url);
    if (response.ok) {
      result = true;
    }
  } catch (e) {
    console.error(e);
  }
  return result;
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
    if (response.ok) {
      words = await response.json();
    } else {
      words = [];
    }
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
  let url = new URL("/auth/get-user-info", location.origin);
  let data;
  try {
    let response = await fetch(url);
    if (response.ok) {
      data = await response.json();
    } else {
      data = {};
    }
  } catch (e) {
    data = {}
  }
  return data;
}

/**
 * Update a user using api
 * @param {JSON} data 
 */
async function updateUser(data, nameChanged, pictureChanged) {
  if (nameChanged) {
    let url = new URL("/auth/update-name", location.origin);
    await fetch(url, {
      method: 'POST',
      body: data,
    });
  }
  if (pictureChanged) {
    let url = new URL("/auth/update-picture", location.origin);
    await fetch(url, {
      method: 'POST',
      body: data,
    });
  }
}

/**
 * Update a user's favorite words using api
 * @param {JSON} data 
 */
async function updateUserFavoriteWords(data) {
  let url = new URL("/auth/update-favorites", location.origin);
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/** Get all users from api
* @returns Array containing all users
*/
async function fetchAllUsers() {
  let url = new URL("/api/all-users", location.origin);
  let data;
  try {
    let response = await fetch(url);
    if (response.ok) {
      data = await response.json();
    } else {
      data = [];
    }
  } catch (e) {
    data = [];
  }
  return data;
}

async function fetchPostElo(data) {
  let url = new URL("/auth/update-elo", location.origin);
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * login of the google authentication
 */
async function handleLogin(googleData) {
  let url = new URL("/auth/login", location.origin);
  let data;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ token: googleData.credential }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      data = await res.json();
    } else {
      data = {user: {}};
    }
  } catch(e) {
    data = {user: {}};
  }

  return data;
}

/**
 * logging out of the authentication
 */
async function handleLogout() {
  let url = new URL("/auth/logout", location.origin);
  try {
    await fetch(url);
  } catch (e) {
    console.log(e);
  }

}

export default {
  fetchDefinition,
  fetchAllWords,
  fetchUser,
  updateUser,
  updateUserFavoriteWords,
  fetchAllUsers,
  fetchPostElo,
  handleLogin,
  handleLogout,
  loggedInCheck
}
