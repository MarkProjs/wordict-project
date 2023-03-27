import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "./SocketContext";
import io from "socket.io-client";

function SocketForm() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
  const socketContext = useContext(SocketContext);
  const navigate = useNavigate();

  /**
   * If the socket is connected, disconnect it
   */
  function tryDisconnect() {
    if (socketContext.socket.current) {
      socketContext.socket.current.disconnect();
    }
  }

  // Attempt to connect on click, also setup listeners on the socket
  function initialiseSocket(room) {
    // If a connection is open, close it
    tryDisconnect();

    // Open a new connection
    socketContext.socket.current = io("", { query: { room: room } });

    // Show the text area upon connecting
    socketContext.socket.current.on("connect", () => {
      console.log("Connected");
      setIsConnected(true);
    });

    // Remove the text field if there is a disconnect
    socketContext.socket.current.on("disconnect", (reason) => {
      console.log("disconnect");
      console.log(reason);
      if (reason !== "io client disconnect") {
        navigate("/wordle-online", {replace: true});
      }
    });

    // Log the error if there is one
    socketContext.socket.current.on("connect_error", (error) => {
      console.log(error);
    });

    // Set the lobby to full so the pregame setup can start
    socketContext.socket.current.once("lobby-full", () => {
      socketContext.socket.current.off("return-code");
      navigate("/wordle-online/startup", {replace: true});
    });

    // Display the room code for easy invites
    socketContext.socket.current.on("return-code", (message) => {
      console.log(message);
      setCurrentRoom(message.code);
    });
  }

  /**
   * When the user tries to connect, setup the socket
   * @param {Event} e Submit event for the connection form
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    initialiseSocket(e.target.room.value);
  }

  useEffect(() => {
    tryDisconnect();
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <p>Your Room: {currentRoom}</p>
        <input id="nextRoom" name="room"/>
        <button>
          Connect
        </button>
      </form>
      {
        isConnected && <div>Waiting For Players</div>
        || <div>Connect To Start</div>
      }
    </>
  );
}

export default SocketForm;