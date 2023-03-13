import { useEffect, useRef, useState } from 'react';
import Wordle from '../Wordle/Wordle.js';
import SocketForm from '../Sockets/SocketForm.js';
import validInputs from "../../controllers/ValidInput.json";
import FetchModule from '../../controllers/FetchModule.js';
import io from "socket.io-client";
import "./MultiPlayerWordle.css"
import GameSettings from '../Sockets/GameSettings.js';

const WORDLE_PREFIX = "W-"

function MultiPlayerWordle() {

  const socket = useRef();
  const [word, setWord] = useState("");
  const [opponentWord, setOpponentWord] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLobbyFull, setIsLobbyFull] = useState(false);
  const [isWordSent, setIsWordSent] = useState(false);
  const [isWordReceived, setIsWordReceived] = useState(false);
  const allWords = useRef([]);

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
      socket.current.emit("keypress", { key: key })
    }));
  }

  // Attempt to connect on click, also setup listeners on the socket
  function initialiseSocket(room) {
    // If a connection is open, close it
    if (socket.current) {
      socket.current.disconnect();
    }

    // Open a new connection
    socket.current = io("", { query: { room: room } });

    // Upon receiving message, change the text area
    socket.current.on("keypress", (key) => {
      console.log("Got Keypress");
      console.log(key);
      serverInputEvent.current.forEach(func => func(key));
    });

    // Show the text area upon connecting
    socket.current.on("connect", () => {
      console.log("Connected");
      setIsConnected(true);
    });

    // Remove the text field if there is a disconnect
    socket.current.on("disconnect", () => {
      console.log("disconnect");

      //TODO Turn this into a function for restarting game
      setIsConnected(false);
      setIsLobbyFull(false);
      setIsWordReceived(false);
      setIsWordSent(false);
    });

    // Log the error if there is one
    socket.current.on("connect_error", (error) => {
      console.log(error);
    });

    // Set the lobby to full so the pregame setup can start
    socket.current.on("lobby-full", () => {
      setIsLobbyFull(true);
    });

    // Receive the player's word from the opponent
    socket.current.on("send-start-data", data => {
      console.log("data received");
      setWord(data.word);
      setIsWordReceived(true);
    })
  }

  /**
   * Send the opponent their word to guess
   * @param {string} word The chosen opponent's word
   */
  function sendWord(word) {
    socket.current.emit("send-start-data", {word: word});
    setOpponentWord(word);
    setIsWordSent(true);
  }

  useEffect(() => {
    (async () => {
      let words = await FetchModule.fetchAllWords(5);
      if (words.length === 0) {
        words = ["Human", "Water", "Saint", "Popes", "Eight", "People", "Caterpillar", "Pillar",
          "Twins", "Tower", "Police"];
      }
      allWords.current = words;
    })();


    // Disconnect from the socket when they leave the page.
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // The player and opponent wordle games
  const gameBoard = <>
    <div className="wordle-container" onKeyUp={(e) => handleKeyInput(e)} tabIndex={0}>
      <div>
        <p>You</p>
        <Wordle
          id={WORDLE_PREFIX + 0}
          person="You"
          attempts={word.length + 1}
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
          attempts={opponentWord.length + 1}
          word={opponentWord}
          submitKey={validInputs.submitKey}
          deleteKey={validInputs.deleteKey}
          subToInputEvent={subToServerInputEvent}
          defaultValue={validInputs.empty}
        />
      </div>
    </div>
  </>

  // Game start condition
  const isGameStarted = isWordSent && isWordReceived;

  return (
    <div>
      <SocketForm
        socket={socket}
        initialiseSocket={initialiseSocket}
      />
      {
        isGameStarted && <div>Game Has Started</div>
        || isWordSent && !isWordReceived && <div>Waiting For Opponent To Pick Your Word</div>
        || isLobbyFull && <div>Choose Your Opponent&apos;s Word</div>
        || isConnected && <div>Waiting For Players</div>
        || <div>Connect To Start</div>
      }
      {
        isLobbyFull && !isWordSent && <GameSettings send={sendWord} allWords={allWords}/>
      }
      {
        isGameStarted && gameBoard
      }
    </div>
  );
}

export default MultiPlayerWordle;
