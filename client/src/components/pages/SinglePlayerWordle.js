import { useEffect, useRef, useState } from 'react';
import Wordle from '../Wordle/Wordle.js';
import validInputs from "../../controllers/ValidInput.json";

const WORDLE_PREFIX = "W-"

function SinglePlayerWordle() {

  const [word, setWord] = useState("");

  const inputListener = useRef(new Map);

  function addInputListener(key, listener) {
    inputListener.current.set(key, listener);
  }

  function handleInput(e) {
    inputListener.current.forEach(func => func(e));
  }

  useEffect(() => {
    (async () => {
      const words = ["Human", "Water", "Saint", "Popes", "Eight", "People", "Caterpillar", "Pillar",
        "Twins", "Tower", "Police"];
      let wordNum = Math.floor(Math.random() * words.length);
      setWord(words[wordNum.valueOf()].toLocaleUpperCase());
    })();
  }, []);

  return (
    <div className="wordle-container" onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      {word ? <Wordle 
        id={WORDLE_PREFIX + 0}
        attempts={6}
        word={word}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      /> : <></>}
      
    </div>
  );
}

export default SinglePlayerWordle;
