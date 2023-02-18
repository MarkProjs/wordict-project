import WordRow from "./WordRow.js";
import * as GameLogic from "../../controllers/GameLogic.js";
import { useEffect, useRef } from "react";

const ROW_PREFIX = "R-";

function Wordle(props) {

  // Contains all of the functions subscribed to the key event
  const keyEvent = useRef(new Map());

  // Contains all of the functions subscribed to the style event
  const styleEvent = useRef(new Map());

  const currentRow = useRef(0);

  const gameDone = useRef(false);

  // Set the default value of the letters to be an array of default values
  const letters = useRef(new Array(props.word.length).fill(props.defaultValue));

  /**
   * Subscribe a function to the key event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the key event
   */
  function subToKeyEvent(key, subFunc) {
    keyEvent.current.set(key, subFunc);
  }


  /**
   * Subscribe a function to the style event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the style event
   */
  function subToStyleEvent(key, subFunc) {
    styleEvent.current.set(key, subFunc);
  }

  /**
   * Process keyboard input and trigger game events accordingly
   * @param {Event} e The key event
   * @param {Function} send An optional function to send the key event result somewhere else
   */
  function handleInput(e, send = undefined) {
    let key = e.key.toLocaleUpperCase();

    //validate key
    if (GameLogic.validateInput(key) && !gameDone.current) {
      
      // Only submit if their entire word is filled 
      // TODO add check if it is a valid word
      if (
        key === props.submitKey 
        && letters.current.every(letter => letter !== props.defaultValue)
      ) {
        // Get the result array to determine which letters are correct
        let results = GameLogic.checkSubmission(letters.current.join(""), props.word);

        // Trigger the style event for the current row
        styleEvent.current.get(ROW_PREFIX + currentRow.current)(results);

        currentRow.current++;
        if (results.every(result => result === GameLogic.RIGHT)) {
          gameDone.current = true;
        } else if (currentRow.current >= letters.current.length) {
          gameDone.current = true;
        }

        //clear the current word that is being written
        letters.current.forEach((letter, index, array) => {
          array[index.toFixed()] = props.defaultValue;
        })
      } else if (key !== props.submitKey) {

        // Trigger the key event for the current row
        keyEvent.current.get(ROW_PREFIX + currentRow.current)(key);
        
        // If the key should be sent somewhere else send it here
        send?.call(key);
      }
    }

  }

  useEffect(() => {
    // Get keyboard input from the parent component
    props.addInputListener(props.id, handleInput);
  }, []);
  

  return (
    <section>
      {letters.current.map((elem, index) => {
        return <WordRow 
          key={index} 
          id={ROW_PREFIX + index}
          wordLength={props.word.length} 
          subToKeyEvent={subToKeyEvent}
          subToStyleEvent={subToStyleEvent}
          letters={letters.current}
          deleteKey={props.deleteKey}
          defaultValue={props.defaultValue}
        />
      })}
    </section>
  );
}

export default Wordle;