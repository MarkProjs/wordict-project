import { useEffect, useState } from "react";
import ValidInput from "../../controllers/ValidInput.json";

function LetterBank(props) {

  const [letters, setLetters] = useState([]);

  /**
   * Remove the displayed words from the filtered words if the guess is valid.
   * @param {Array} guessedLetters letters that have been guessed by the user
   * @param {Boolean} validGuess Whether the current guess is valid or not
   */
  function filterGuessedLetters(guessedLetters, validGuess) {
    if (validGuess) {
      setLetters(letters => letters.filter(letter => !guessedLetters.includes(letter)));
    }
  }

  /**
   * Take valid input and remove action keys from it
   * @returns an array of letters that can be guessed
   */
  function getDefaultLetters() {
    return ValidInput.validInput.filter(l => {
      return l !== ValidInput.deleteKey && l !== ValidInput.submitKey
    });
  }

  useEffect(() => {
    // Set the letters to the default upon rerender from parent (reset)
    setLetters(getDefaultLetters);
    // Sub to the guess event
    props.subToGuessEvent(props.id, filterGuessedLetters);
  }, [props]);

  return (
    <p>
      {letters.join(" ")}
    </p>
  );
}

export default LetterBank;