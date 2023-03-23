import validInput from "./ValidInput.json"

// Constants for the correctness of each letter
// theoretically can use any three values as long as they
// can be put into an array and are each unique
const RIGHT = 0;
const HALF_RIGHT = 1;
const WRONG = 2;

/**
 * Check if the input is valid when compared to the valid inputs
 * @param {String} input String representing the input from the user
 * @returns Boolean representting the validity
 */
function validateInput(input) {
  return validInput.validInput.includes(input)
}

/**
 * Compares the word the user is trying to guess with the word they have guessed
 * and returns the correctness of each letter
 * @param {String} submission Represents the word that the user has guessed
 * @param {String} word Represents the word that the user is trying to guess
 * @returns An array containing whether each letter is in the correct position or not
 */
function checkSubmission(submission, word) {

  if (!submission || !word || submission.length !== word.length) {
    throw new Error("Invalid inputs");
  }

  // Holds the correctness of each letter in the guess
  const result = [];

  submission = submission.toLocaleLowerCase();
  word = word.toLocaleLowerCase();

  let submissionArray = submission.split("");
  let wordArray = word.split("");

  submissionArray.forEach((letter, index) => {

    if (letter === wordArray[index.valueOf()]) {

      result.push(RIGHT);

      // Consume the letter in the correct word array so you get
      // the correct amount of half right letters
      wordArray[index.valueOf()] = "";

    } else {

      let nextOccurence = wordArray.indexOf(letter);

      if (nextOccurence === -1) {

        result.push(WRONG);

      } else if (submissionArray[nextOccurence.valueOf()] !== letter) {

        result.push(HALF_RIGHT);

        // Consume the letter in the correct word array so you get
        // the correct amount of half right letters
        wordArray[nextOccurence.valueOf()] = "";

      } else {

        result.push(WRONG);

      }
    }
  });
  return result;
}

/**
 * Calculates the elo received after the game
 * @param {String} word Represents the word that the user is trying to guess
 * @param {int} attempts Represents the number of attempts it took for the user to guess the word
 * @param {Boolean} gameWon Represents if the game is won or not
 */
function calculateElo(word, attempts, gameWon) {
  if (gameWon) {
    console.log(`${word}, ${attempts}, ${gameWon}`)
    let defaultScore = 100
    return Math.floor(defaultScore * (word.length / 5) ** 1.5 / attempts)
  } else {
    return -20
  }
}

export { validateInput, checkSubmission, RIGHT, HALF_RIGHT, WRONG, calculateElo };