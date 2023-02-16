import Letter from "./Letter.js";
import {useEffect, useRef} from "react";
import { RIGHT, HALF_RIGHT} from "../controllers/GameLogic.js";
import "./WordRow.css"

function WordRow(props) {

  // Contains all the functions subscribed to the state event
  const stateEvent = useRef([]);

  const currentLetter = useRef(0);

  /**
   * Subscribe a function to the state event
   * @param {Function} subFunc The function to subscribe to the state event
   */
  function subToStateEvent(subFunc) {
    stateEvent.current.push(subFunc);
  }

  /**
   * Update the state of the current letter component to reflect the overall state of the row
   * @param {String} letter The string representing the key that was pressed
   */
  function updateLetters(letter) {

    if (letter === props.deleteKey && currentLetter.current > 0) {

      // Trigger the state event to remove the letter in the active letter component
      stateEvent.current[--currentLetter.current]((prev) => {
        return {...prev, key: props.defaultValue};
      });

      // Update the parent array representation of the row to reflect the change
      props.letters[currentLetter.current] = props.defaultValue;

    } else if (letter !== props.deleteKey && currentLetter.current < props.wordLength) {

      // Trigger the state event to add the letter to the active letter component
      stateEvent.current[currentLetter.current]((prev) => {
        return {...prev, key: letter};
      });

      // Update the parent array representation of the row to reflect the change
      props.letters[currentLetter.current] = letter;

      currentLetter.current++;
    }
  }

  /**
   * Update the state of all the letters in the row to show the user if their guesses were correct
   * @param {Array<Int>} styles An array containing integers representing the styling that 
   * should be applied to each letter
   */
  function applyLetterStyles(styles) {
    styles.forEach((styleNum, index) => {
      let style = "";
      if (styleNum === RIGHT) {
        style = "right"
      } else if (styleNum === HALF_RIGHT) {
        style = "half-right"
      } else {
        style = "wrong";
      }

      // Trigger the state event to update the style of the letter
      stateEvent.current[index.valueOf()]((prev) => {
        return {...prev, style: style}
      });
    });
  }

  useEffect(() => {
    // Subscribe to the parent events
    props.subToKeyEvent(updateLetters);
    props.subToStyleEvent(applyLetterStyles);
  }, []);

  return (
    <article className="word-row">
      {props.letters.map((elem, index) => {
        return <Letter 
          key={index} 
          subToStateEvent={subToStateEvent}
          defaultValue={props.defaultValue}  
        />
      })}
    </article>
  );
}

export default WordRow;