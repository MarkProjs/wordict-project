import Letter from "./Letter.js";
import {useEffect, useRef} from "react";
import { RIGHT, HALF_RIGHT, WRONG } from "../controllers/GameLogic.js";
import "./WordRow.css"

function WordRow(props) {
  const stateFuncs = useRef([]);
  const currentLetter = useRef(0);

  function updateLetters(letter) {
    console.log(letter); 
    console.log(currentLetter.current);
    if (letter === props.deleteKey && currentLetter.current > 0) {
      stateFuncs.current[--currentLetter.current]((prev) => {
        return {...prev, key: props.defaultValue};
      });
      props.letters[currentLetter.current] = props.defaultValue;
    } else if (letter !== props.deleteKey && currentLetter.current < props.wordLength) {
      stateFuncs.current[currentLetter.current]((prev) => {
        return {...prev, key: letter};
      });
      props.letters[currentLetter.current] = letter;
      currentLetter.current++;
    }
  }

  function applyLetterStyles(styles) {
    styles.forEach((styleNum, index) => {
      let style = "";
      if (styleNum === RIGHT) {
        style = "right"
      } else if (styleNum === HALF_RIGHT) {
        style = "half-right"
      } else {
        style = "wrong";
      }
      stateFuncs.current[index.valueOf()]((prev) => {
        return {...prev, style: style}
      });
    });
  }

  useEffect(() => {
    props.addInputListener(updateLetters);
    props.addStyleListener(applyLetterStyles);
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