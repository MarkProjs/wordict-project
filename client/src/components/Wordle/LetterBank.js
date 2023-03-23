import { useEffect, useState } from "react";
import ValidInput from "../../controllers/ValidInput.json";

function LetterBank(props) {
  
  const [letters, setLetters] = useState( 
    ValidInput.validInput.filter(l => l !== ValidInput.deleteKey && l !== ValidInput.submitKey)
  );

  /**
   * 
   * @param {Array} guessedLetters 
   */
  function filterGuessedLetters(guessedLetters) {
    
    setLetters(letters.filter(letter => !guessedLetters.includes(letter)));
  }

  useEffect(() => {
    props.subToGuessEvent(props.id, filterGuessedLetters);
  });

  return (
    <p>
      {letters.join(" ")}
    </p>
  );
}

export default LetterBank;