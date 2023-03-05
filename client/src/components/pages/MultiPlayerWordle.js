import { useEffect, useRef, useState } from 'react';
import Wordle from '../Wordle/Wordle.js';
import SocketForm from '../Sockets/SocketForm.js';
import validInputs from "../../controllers/ValidInput.json";
import io from "socket.io-client";
import "./MultiPlayerWordle.css"

const WORDLE_PREFIX = "W-"

function MultiPlayerWordle() {

  const socket = useRef();
  const word = useRef("");
  const [opponentWord, setOpponentWord] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
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
      socket.current.emit("keypress", {key: key})
    }));
  }

  // Attempt to connect on click, also setup listeners on the socket
  function initialiseSocket(room) {
    console.log(allWords.current);
    let wordNum = Math.floor(Math.random() * allWords.current.length);
    word.current = allWords.current[wordNum.valueOf()];
    // If a connection is open, close it
    if (socket.current) {
      socket.current.disconnect();
    }

    // Open a new connection
    socket.current = io("", {query: {room: room}});

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
      setIsConnected(false);
      setGameStarted(false);
    });

    // Log the error if there is one
    socket.current.on("connect_error", (error) => {
      console.log(error);
    });

    socket.current.on("lobby-full", () => {
      socket.current.emit("send-start-data", {word: word.current});
    });

    socket.current.on("send-start-data", data => {
      console.log("data received");
      setOpponentWord(data.word);
      setGameStarted(true);
    })
  }

  useEffect(() => {
    (async () => {
      let words;
      let url = new URL(`/api/dictionary`, location.origin);
      url.searchParams.set("length", "5");
      try {
        let response = await fetch(url);
        if (response.ok) {
          words = await response.json();
          if (words.length === 0) {
            throw new Error("No words found");
          }
        } else {
          throw new Error("Couldn't get words");
        }
      } catch(e) {
        words = ["Human", "Water", "Saint", "Popes", "Eight", "People", "Caterpillar", "Pillar",
          "Twins", "Tower", "Police"];
        console.error(e);
      }
      allWords.current = words;
    })();
  }, []);

  return (
    <div>
      <SocketForm
        socket={socket}
        initialiseSocket={initialiseSocket}
      />
      {console.log(gameStarted)}
      {
        isConnected ? gameStarted ? <div>Game Has Started</div> :
          <div>Waiting For Players</div> : <div>Connect To Start</div> 
      }
      {gameStarted ? <>
        <div className="wordle-container" onKeyUp={(e) => handleKeyInput(e)} tabIndex={0}>
          <div>
            <p>You</p>
            <Wordle 
              id={WORDLE_PREFIX + 0}
              person="You"
              attempts={word.current.length + 1}
              word={word.current}
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
              attempts={word.current.length + 1}
              word={opponentWord}
              submitKey={validInputs.submitKey}
              deleteKey={validInputs.deleteKey}
              subToInputEvent={subToServerInputEvent}
              defaultValue={validInputs.empty}
            />
          </div>
        </div>
      </> : <></>
      }
    </div>
  );
}

export default MultiPlayerWordle;
