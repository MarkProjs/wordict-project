import { useEffect, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import Wordle from '../Wordle/Wordle.js';
import validInputs from "../../controllers/ValidInput.json";
import SocketContext from './SocketContext.js';

const WORDLE_PREFIX = "W-"

function GameBoard(props) {

  const location = useLocation();
  const word = location.state?.ownWord || "";
  const opponentWord = location.state?.opponentWord || "";
  const socketContext = useContext(SocketContext);

  // Contains all of the functions subscribed to the key input event
  const keyInputEvent = useRef(new Map());

  // Contains all of the functions subscribed to the server input event
  // The server input event is the input sent from the oponent passed from the server
  const serverInputEvent = useRef(new Map());

  /**
   * Subscribe a function to the key input event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the input event
   */
  function subToKeyInputEvent(key, subFunc) {
    keyInputEvent.current.set(key, subFunc);
  }

  /**
   * Subscribe a function to the server input event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the input event
   */
  function subToServerInputEvent(key, subFunc) {
    serverInputEvent.current.set(key, subFunc);
  }

  /**
   * Trigger the keyboard input event for all subscribers
   * @param {Event} e The Keyboard input event
   */
  function handleKeyInput(e) {
    keyInputEvent.current.forEach(func => func(e, key => {
      // Sending the key in this object  is important because of how
      // it is expected to be when received
      socketContext.socket.current.emit("keypress", { key: key })
    }));
  }

  useEffect(() => {

    props.sendToStart(socketContext.socket);

    if (socketContext.socket.current && socketContext.socket.current.connected) {
      //Don't want to double up on the listeners
      socketContext.socket.current.off("keypress");
      // Upon receiving message, change the text area
      socketContext.socket.current.on("keypress", (key) => {
        console.log("Got Keypress");
        console.log(key);
        serverInputEvent.current.forEach(func => func(key));
      });
    }
  }, []);

  return (
    <div className="wordle-container" onKeyUp={(e) => handleKeyInput(e)} tabIndex={0}>
      <div>
        <p>You</p>
        <Wordle
          id={WORDLE_PREFIX + 0}
          person="You"
          word={word}
          submitKey={validInputs.submitKey}
          deleteKey={validInputs.deleteKey}
          subToInputEvent={subToKeyInputEvent}
          defaultValue={validInputs.empty}
        />
      </div>
      <div>
        <p>Your Opponent</p>
        <Wordle
          id={WORDLE_PREFIX + 1}
          person="Your opponent"
          word={opponentWord}
          submitKey={validInputs.submitKey}
          deleteKey={validInputs.deleteKey}
          subToInputEvent={subToServerInputEvent}
          defaultValue={validInputs.empty}
        />
      </div>
    </div>
  );
}

export default GameBoard;