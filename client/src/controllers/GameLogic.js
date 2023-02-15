import validInput from "./ValidInput.json"

function validateInput(input) {
  return validInput.validInput.includes(input)
}

export {validateInput};