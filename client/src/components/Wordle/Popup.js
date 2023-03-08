import { useState, useEffect } from "react";
import FetchModule from "../../controllers/FetchModule";
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
      let data = await FetchModule.fetchDefinition(props.word);
      if (data === null) {
        data = {definitions: []}
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