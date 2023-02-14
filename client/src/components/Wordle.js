import WordRow from "./WordRow.js";
import { useRef } from "react";

function Wordle(props) {
  const keyEventFuncs = useRef([]);
  const currentRow = useRef(0);

  function addInputListener(listenerFunc) {
    keyEventFuncs.current.push(listenerFunc);
  }

  //Change to passed in by props later
  function handleInput(e) {
    let key = e.key;
    //validate key
    let valid = true;
    if (valid) {
      if (key === "Enter") {
        //Submit game logic code stuff here
        currentRow.current = currentRow.current + 1 >= props.attempts ? 0 : currentRow.current + 1;
        console.log("Enter" + currentRow.current);
      } else {
        keyEventFuncs.current[currentRow.current](key);
      }
    }

  }

  return (
    <section onKeyUp={(e) => handleInput(e)} tabIndex={0}>
      {new Array(props.attempts).fill(0).map((elem, index) => {
        return <WordRow 
          key={index} 
          wordLength={props.wordLength} 
          addInputListener={addInputListener}
        />
      })}
    </section>
  );
}

export default Wordle;