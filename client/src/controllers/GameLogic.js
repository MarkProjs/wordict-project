import validInput from "./ValidInput.json"

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
  const result = [];
  submission.split("").forEach((letter, index, array) => {
    if (letter === word.charAt(index)) {
      result.push(RIGHT);
    } else {
      let nextOccurence = word.indexOf(letter, index);
      if (nextOccurence === -1) {
        let prevOccurence = word.indexOf(letter)
        if (prevOccurence !== -1 && result[prevOccurence.valueOf()] !== RIGHT) {
          result.push(HALF_RIGHT);
        } else {
          result.push(WRONG);
        }
      } else if (array[nextOccurence.valueOf()] !== letter) {
        result.push(HALF_RIGHT);
      } else {
        result.push(WRONG);
      }
    }
  });
  return result;
}

export {validateInput, checkSubmission, RIGHT, HALF_RIGHT, WRONG};