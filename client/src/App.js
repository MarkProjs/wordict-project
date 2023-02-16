import { useRef } from 'react';
import './App.css';
import Wordle from './components/Wordle';
import validInputs from "./controllers/ValidInput.json";

const WORDLE_PREFIX = "W-"

function App() {

  const inputListener = useRef(new Map);

  function addInputListener(key, listener) {
    inputListener.current.set(key, listener);
  }

  function handleInput(e) {
    inputListener.current.forEach(func => func(e));
  }

  return (
    <div className="App" onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      <Wordle 
        id={WORDLE_PREFIX + 0}
        attempts={6}
        word={"WATER"}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      />
      <Wordle 
        id={WORDLE_PREFIX + 1}
        attempts={6}
        word={"PAPER"}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      />
    </div>
  );
}

export default App;
