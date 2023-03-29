import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PreviousPageContext from "../NavigationExtra/PreviousPageContext";
import SocketContext from "./SocketContext";

function GameSettings(props) {
  
  const [isWordSent, setIsWordSent] = useState(false);
  const [isWordReceived, setIsWordReceived] = useState(false);
  const ownWord = useRef("");
  const [opponentWord, setOpponentWord] = useState("");
  const socketContext = useContext(SocketContext);
  const previousPageContext = useContext(PreviousPageContext);
  const navigate = useNavigate();

  /**
   * Set the state of the word input field to whatever it is changed to
   * and remove its invalidity
   * @param {Event} e The input event for the word input field
   */
  function handleWordInput(e) {
    setOpponentWord(e.target.value)
    e.target.setCustomValidity("");
  }

  /**
   * Randomise the word in the input field
   * @param {Event} e The button click event
   */
  function randomiseWord(e) {
    e.preventDefault();
    let wordNum = Math.floor(Math.random() * props.allWords.current.length);
    setOpponentWord(props.allWords.current[wordNum.valueOf()]);
    e.target.parentNode.word.setCustomValidity("");
  }

  /**
   * Send the chosen word to the specified send funtion given by props
   * or display a custom invalid message
   * @param {Event} e Form Submit event
   */
  function handleSend(e) {
    e.preventDefault();
    if (props.allWords.current.includes(opponentWord)) {
      console.log(opponentWord);
      sendWord(opponentWord);
    } else {
      e.target.word.setCustomValidity("That word is not in our dictionary");
      e.target.word.reportValidity();
    }
  }

  /**
   * Send the opponent their word to guess
   * @param {string} word The chosen opponent's word
   */
  function sendWord(word) {
    socketContext.socket.current.emit("send-start-data", {word: word});
    setIsWordSent(true);
  }

  useEffect(() => {

    if (previousPageContext.previousPage !== "/wordle-online/connect" 
    && previousPageContext.previousPage !== "/wordle-online/game") {
      navigate("/wordle-online", {replace: true});
    }

    if (socketContext.socket.current && socketContext.socket.current.connected) {
      //Don't want to double up on the listeners
      socketContext.socket.current.off("send-start-data");
      // Receive the player's word from the opponent
      socketContext.socket.current.on("send-start-data", data => {
        console.log("data received");
        ownWord.current = data.word;
        setIsWordReceived(true);
      })
    }
    
  }, []);

  useEffect(() => {
    if (isWordSent && isWordReceived) {
      navigate("/wordle-online/game", {
        replace: true, 
        state: {
          ownWord: ownWord.current, 
          opponentWord: opponentWord,
        }
      })
    }
  }, [isWordSent, isWordReceived]);

  return (
    <>
      {
        isWordSent && <p>Word Sent to Opponent</p>
        || <form onSubmit={e => handleSend(e)}>
          <label htmlFor="word">Opponent&apos;s Word: </label>
          <input required value={opponentWord} onInput={e => handleWordInput(e)} name="word"/>
          <button>Send</button>
          <br/>
          <button onClick={e => randomiseWord(e)}>Randomise</button>
        </form>
      }
      {
        isWordReceived && <p>Word Received From Opponent</p>
      }
    </>
  );
}

export default GameSettings;