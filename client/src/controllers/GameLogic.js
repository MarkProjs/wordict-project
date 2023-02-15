import validInput from "./ValidInput.json"

const GREEN = 0;
const YELLOW = 1;
const RED = 2;

function validateInput(input) {
  return validInput.validInput.includes(input)
}

function checkSubmission(submission, word) {
  const result = [];
  submission.split("").forEach((letter, index, array) => {
    if (letter === word.charAt(index)) {
      result.push(GREEN);
    } else {
      let nextOccurence = word.indexOf(letter, index);
      if (nextOccurence === -1) {
        let prevOccurence = word.indexOf(letter)
        if (prevOccurence !== -1 && result[prevOccurence.valueOf()] !== GREEN) {
          result.push(YELLOW);
        } else {
          result.push(RED);
        }
      } else if (array[nextOccurence.valueOf()] !== letter) {
        result.push(YELLOW);
      } else {
        result.push(RED);
      }
    }
  });
  return result;
}

export {validateInput, checkSubmission};