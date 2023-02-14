import Letter from "./Letter.js";
import {useEffect, useRef, useState} from "react";
import "./WordRow.css"

function WordRow(props) {
  const stateFuncs = useRef([]);
  const currentLetter = useRef(0);

  function updateLetters(letter) {
    console.log(letter); 
    console.log(currentLetter.current);
    if (letter === "Backspace" && currentLetter.current > 0) {
      stateFuncs.current[--currentLetter.current]("");
    } else if (letter !== "Backspace" && currentLetter.current < props.wordLength) {
      stateFuncs.current[currentLetter.current](letter);
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
      {new Array(props.wordLength).fill(0).map((elem, index) => {
        return <Letter key={index} addLetter={addLetter}/>
      })}
    </article>
  );
}

export default WordRow;