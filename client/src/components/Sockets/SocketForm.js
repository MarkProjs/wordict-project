import { useEffect, useState } from "react";

function SocketForm(props) {
  
  const [currentRoom, setCurrentRoom] = useState("");


  function handleFormSubmit(e) {
    e.preventDefault();
    props.initialiseSocket(e.target.room.value);
    props.socket.current.on("return-code", (message) => {
      console.log(message);
      setCurrentRoom(message.code);
    })
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <p>Your Room: {currentRoom}</p>
      <input id="nextRoom" name="room"/>
      <button>
        Connect
      </button>
    </form>
  );
}

export default SocketForm;