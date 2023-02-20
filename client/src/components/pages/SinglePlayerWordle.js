import { useRef } from 'react';
import Wordle from '../Wordle/Wordle.js';
import validInputs from "../../controllers/ValidInput.json";

const WORDLE_PREFIX = "W-"

function SinglePlayerWordle() {

  const inputListener = useRef(new Map);

  function addInputListener(key, listener) {
    inputListener.current.set(key, listener);
  }

  function handleInput(e) {
    inputListener.current.forEach(func => func(e));
  }

  return (
    <div className="wordle-container" onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      <Wordle 
        id={WORDLE_PREFIX + 0}
        attempts={6}
        word={"HUMAN"}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      />
      <Wordle 
        id={WORDLE_PREFIX + 1}
        attempts={6}
        word={"PEOPLE"}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      />
    </div>
  );
}

export default SinglePlayerWordle;
