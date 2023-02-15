import { useRef } from 'react';
import './App.css';
import Wordle from './components/Wordle';
import validInputs from "./controllers/ValidInput.json";


function App() {

  const inputListener = useRef(() => {});

  function addInputListener(listener) {
    inputListener.current = listener;
  }

  function handleInput(e) {
    inputListener.current(e);
  }

  return (
    <div className="App" onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      <Wordle 
        attempts={6} 
        wordLength={5}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        addInputListener={addInputListener}
        defaultValue={validInputs.empty}
      />
    </div>
  );
}

export default App;
