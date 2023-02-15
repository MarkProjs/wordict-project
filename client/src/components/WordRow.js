import Letter from "./Letter.js";
import {useEffect, useRef} from "react";
import "./WordRow.css"

function WordRow(props) {
  const stateFuncs = useRef([]);
  const currentLetter = useRef(0);

  function updateLetters(letter) {
    console.log(letter); 
    console.log(currentLetter.current);
    if (letter === props.deleteKey && currentLetter.current > 0) {
      stateFuncs.current[--currentLetter.current](props.defaultValue);
      props.letters[currentLetter.current] = props.defaultValue;
    } else if (letter !== props.deleteKey && currentLetter.current < props.wordLength) {
      stateFuncs.current[currentLetter.current](letter);
      props.letters[currentLetter.current] = letter;
      currentLetter.current++;
    }
  }

  useEffect(() => {
    props.addInputListener(updateLetters);
  }, []);

  function addLetter(stateFunc) {
    stateFuncs.current.push(stateFunc);
  }

  return (
    <article className="word-row">
      {props.letters.map((elem, index) => {
        return <Letter 
          key={index} 
          addLetter={addLetter}
          defaultValue={props.defaultValue}  
        />
      })}
    </article>
  );
}

export default WordRow;