import WordRow from "./WordRow.js";
import * as GameLogic from "../controllers/GameLogic.js";
import { useEffect, useRef } from "react";

function Wordle(props) {
  const keyEventFuncs = useRef([]);
  const currentRow = useRef(0);
  const letters = useRef(new Array(props.wordLength).fill(props.defaultValue));

  function addInputListener(listenerFunc) {
    keyEventFuncs.current.push(listenerFunc);
  }

  function handleInput(e, send = undefined) {
    let key = e.key.toLocaleUpperCase();
    //validate key
    if (GameLogic.validateInput(key)) {
      console.log(letters.current)
      console.log(letters.current.every(letter => console.log(letter)))
      if (key === props.submitKey && letters.current.every(letter => letter !== props.defaultValue)) {
        //Submit game logic code stuff here
        console.log(letters.current.join(""));
        currentRow.current = currentRow.current + 1 >= props.attempts ? 0 : currentRow.current + 1;
        console.log("Enter " + currentRow.current);
        letters.current.forEach((letter, index, array) => {
          array[index.toFixed()] = props.defaultValue;
        })
      } else if (key !== props.submitKey) {
        keyEventFuncs.current[currentRow.current](key);
        send?.call(key);
      }
    }

  }

  useEffect(() => {
    props.addInputListener(handleInput);
  }, []);
  

  return (
    <section>
      {letters.current.map((elem, index) => {
        return <WordRow 
          key={index} 
          wordLength={props.wordLength} 
          addInputListener={addInputListener}
          letters={letters.current}
          deleteKey={props.deleteKey}
          defaultValue={props.defaultValue}
        />
      })}
    </section>
  );
}

export default Wordle;