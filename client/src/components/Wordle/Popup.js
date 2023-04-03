import { useState, useEffect } from "react";
import FetchModule from "../../controllers/FetchModule";
import { calculateElo } from "../../controllers/GameLogic";
import "./Popup.css";

function Popup(props) {
  const [elo, setElo] = useState();
  const [gameState, setGameState] = useState({});
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    setGameState({ done: false, win: false, attempts: 1 });
    // Subscribe to the parent events
    props.subToGameStateEvent(props.id, setGameState);
  }, [props]);

  useEffect(() => {
    (async () => {
      let data = await FetchModule.fetchDefinition(props.word);
      if (data === null) {
        data = { definitions: [] }
      }
      setDefinitions(data.definitions);
    })();
  }, [props.word]);

  useEffect(() => {
    if (gameState.done) {
      // Calculate Elo
      setElo(calculateElo(props.word, gameState.attempts, gameState.win));
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.done && props.shouldPost) {
      (async () => {
        // Update Elo
        await FetchModule.fetchPostElo({ elo: elo })
      })();
    }
  }, [elo]);

  return (
    <>
      {gameState.done && <article className="popup">
        <p>{props.person} {gameState.win ? "won!!!" :
          "Lost :(("}</p>
        <p>{elo} Points !</p>
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