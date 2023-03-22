import { useState, useEffect } from "react";
import FetchModule from "../../controllers/FetchModule";
import { calculateElo } from "../../controllers/GameLogic";
import "./Popup.css";

function Popup(props) {
  const [gameState, setGameState] = useState({ done: false, win: false });
  const [definitions, setDefinitions] = useState([]);
  const [elo, setElo] = useState();
  useEffect(() => {
    // Subscribe to the parent events
    props.subToGameStateEvent(props.id, setGameState);
    // Calculate Elo
    setElo(calculateElo(props.word, props.attempts, gameState.win))
  });

  useEffect(() => {
    (async () => {
      let data = await FetchModule.fetchDefinition(props.word);
      if (data === null) {
        data = { definitions: [] }
      }
      setDefinitions(data.definitions);
    })();
  }, [props.word]);

  return (
    <>
      {gameState.done && <article className="popup">
        <p>{props.person} have {gameState.win ? `won!!! \n+${elo} Points` :
          `Lost :(( \n${elo} Points`}</p>
        <p>The word was {props.word}</p>
        <ul>
          {definitions.map((definition, i) => {
            return <li key={i}>{definition.definition}</li>
          })}
        </ul>
      </article>}
    </>
  );

}

export default Popup;