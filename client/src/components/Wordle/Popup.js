import { useState, useEffect } from "react";
import "./Popup.css";

function Popup(props) {
  const [gameState, setGameState] = useState({done: false, win: false});
  const [definitions, setDefinitions] = useState([]);
  useEffect(() => {
    // Subscribe to the parent events
    props.subToGameStateEvent(props.id, setGameState);
  });

  useEffect(() => {
    (async () => {
      let url = new URL(`/api/${props.word.toLowerCase()}/definition`, location.origin);
      let data;
      try {
        let response = await fetch(url);
        data = await response.json();
      } catch (e) {
        data = {definitions: []};
      }
      setDefinitions(data.definitions);
    })();
  }, [props.word]);

  return (
    <>
      {gameState.done ? <article className="popup">
        <p>{props.person} have {gameState.win ? "won!!!" : "Lost :(("}</p>
        <p>The word was {props.word}</p>
        <ul>
          {definitions.map((definition, i) => {
            return <li key={i}>{definition.definition}</li>
          })}
        </ul>
      </article> : <></>}
    </>
  );
  
}

export default Popup;