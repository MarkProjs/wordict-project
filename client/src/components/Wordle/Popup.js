import { useState, useEffect } from "react";
import "./Popup.css";

function Popup(props) {
  const [gameState, setGameState] = useState({done: false, win: false});

  useEffect(() => {
    // Subscribe to the parent events
    props.subToGameStateEvent(props.id, setGameState);
  }, []);

  return (
    <>
      {gameState.done ? <article className="popup">
        <p>You have {gameState.win ? "won!!!" : "Lost :(("}</p>
        <p>The word was {props.word}</p>
      </article> : <></>}
    </>
  );
  
}

export default Popup;