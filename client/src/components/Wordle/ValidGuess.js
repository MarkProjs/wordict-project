import { useState, useEffect } from "react";


function ValidGuess(props) {

  const [isValidGuess, setIsValidGuess] = useState(true);
  const [guess, setGuess] = useState(""); 

  /**
   * Display whether the word is valid or not based on the guess event
   * @param {Array} letters The guessed letters
   * @param {Boolean} validGuess Whether the guess is valid or not
   */
  function handleKeyInput(letters, validGuess) {
    setGuess(letters.join(""));
    setIsValidGuess(validGuess);
  }

  useEffect(() => {
    // Get keyboard input from the parent component
    props.subToGuessEvent(props.id, handleKeyInput);
  }, [props]);

  return (
    isValidGuess ? <></> : <p className="error">{guess} is not in our dictionary</p>
  );
}

export default ValidGuess;