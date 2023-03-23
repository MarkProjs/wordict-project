import { useEffect, useState } from 'react';
import Wordle from '../Wordle/Wordle.js';
import validInputs from "../../controllers/ValidInput.json";
import FetchModule from '../../controllers/FetchModule.js';

const WORDLE_PREFIX = "W-"

function SinglePlayerWordle() {

  const [word, setWord] = useState("");

  // Contains all of the functions subscribed to the input event
  const inputEvent = new Map();

  /**
   * Subscribe a function to the input event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the input event
   */
  function subToInputEvent(key, subFunc) {
    inputEvent.set(key, subFunc);
  }

  /**
   * Trigger the keyboard input event for all subscribers
   * @param {Event} e The Keyboard input event
   */
  function handleInput(e) {
    inputEvent.forEach(func => func(e));
  }

  useEffect(() => {
    (async () => {
      let words = await FetchModule.fetchAllWords(5);
      if (words.length === 0) {
        words = ["Human", "Water", "Saint", "Popes", "Eight", "People", "Caterpillar", "Pillar",
          "Twins", "Tower", "Police"];
      }
      let wordNum = Math.floor(Math.random() * words.length);
      setWord(words[wordNum.valueOf()]);
    })();
  }, []);

  return (
    <div className="wordle-container" onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      <Wordle 
        id={WORDLE_PREFIX + 0}
        person="You"
        word={word}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        subToInputEvent={subToInputEvent}
        defaultValue={validInputs.empty}
      />
      
    </div>
  );
}

export default SinglePlayerWordle;
