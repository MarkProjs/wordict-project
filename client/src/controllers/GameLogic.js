import validInput from "./ValidInput.json"

const RIGHT = 0;
const HALF_RIGHT = 1;
const WRONG = 2;

function validateInput(input) {
  return validInput.validInput.includes(input)
}

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