import { useEffect, useState } from 'react';
import Wordle from '../Wordle/Wordle.js';
import validInputs from "../../controllers/ValidInput.json";
import io from "socket.io-client";
let socket;

const WORDLE_PREFIX = "W-"

function SinglePlayerWordle() {

  const [word, setWord] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [nextRoom, setNextRoom] = useState("");

  // Contains all of the functions subscribed to the key input event
  const keyInputEvent = new Map();

  // Contains all of the functions subscribed to the server input event
  // The server input event is the input sent from the oponent passed from the server
  const serverInputEvent = new Map();

  /**
   * Subscribe a function to the key input event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the input event
   */
  function subToKeyInputEvent(key, subFunc) {
    keyInputEvent.set(key, subFunc);
  }

  /**
   * Subscribe a function to the server input event
   * @param {String} key The key associated with the subscription
   * @param {Function} subFunc The function to subscribe to the input event
   */
  function subToServerInputEvent(key, subFunc) {
    serverInputEvent.set(key, subFunc);
  }

  /**
   * Trigger the keyboard input event for all subscribers
   * @param {Event} e The Keyboard input event
   */
  function handleKeyInput(e) {
    keyInputEvent.forEach(func => func(e, key => {socket.emit("keypress", {key: key})}));
  }

  // Attempt to connect on click, also setup listeners on the socket
  function handleClick() {
    // If a connection is open, close it
    if (socket) {
      socket.disconnect();
    }

    // Open a new connection
    socket = io("", {query: {room: nextRoom}});

    // Upon receiving message, change the text area
    socket.on("keypress", (key) => {
      console.log("Got Keypress")
      console.log(key)
      serverInputEvent.forEach(func => func(key));
    })

    // Show the text area upon connecting
    socket.on("connect", () => {
      console.log("Connected");
    });

    // Show the room code upon receiving it
    socket.on("return-code", (message) => {
      console.log(message);
      setCurrentRoom(message.code);
    })

    // Remove the text field if there is a disconnect
    socket.on("disconnect", () => {
      console.log("disconnect");
    });

    // Log the error if there is one
    socket.on("connect_error", (error) => {
      console.log(error);
    })
  }

  // Upon changing which room you want to join, change the value of the input
  function handleRoomChange(e) {
    setNextRoom(e.target.value);
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
      
      let wordNum = Math.floor(Math.random() * words.length);
      setWord(words[wordNum.valueOf()]);
    })();
  }, []);

  return (
    <div>
      <p>Your Room: {currentRoom}</p>
      <input id="nextRoom" value={nextRoom} onChange={(e) => handleRoomChange(e)}/>
      <button onClick={handleClick}>
        Connect
      </button>
      <div className="wordle-container" onKeyUp={(e) => handleKeyInput(e)} tabIndex={0}>
        <Wordle 
          id={WORDLE_PREFIX + 0}
          attempts={word.length + 1}
          word={word}
          submitKey={validInputs.submitKey}
          deleteKey={validInputs.deleteKey}
          subToInputEvent={subToKeyInputEvent}
          defaultValue={validInputs.empty}
        />
      </div>
      <Wordle 
        id={WORDLE_PREFIX + 1}
        attempts={word.length + 1}
        word={word}
        submitKey={validInputs.submitKey}
        deleteKey={validInputs.deleteKey}
        subToInputEvent={subToServerInputEvent}
        defaultValue={validInputs.empty}
      />
    </div>
  );
}

export default SinglePlayerWordle;
