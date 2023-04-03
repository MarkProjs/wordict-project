import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from './SocketContext.js';

function RematchButton(props) {

  const socketContext = useContext(SocketContext);
  const [isGameDone, setIsGameDone] = useState(false);
  const [isRematchSent, setIsRematchSent] = useState(false);
  const [isRematchReceived, setIsRematchReceived] = useState(false);
  const navigate = useNavigate();
  /**
   * Request a rematch from the opponent
   */
  function requestRematch() {
    socketContext.socket.current.emit("request-rematch");
    setIsRematchSent(true)
  }

  useEffect(() => {

    if (socketContext.socket.current && socketContext.socket.current.connected) {
      //Don't want to double up on the listeners
      socketContext.socket.current.off("game-done");
      socketContext.socket.current.off("request-rematch");

      // Upon receiving a rematch request, display to the user
      socketContext.socket.current.on("request-rematch", () => {
        setIsRematchReceived(true);
      });

      // Upon being notified that the game is done, display the rematch button
      socketContext.socket.current.on("game-done", () => {
        setIsGameDone(true);
      });
    }
  }, []);

  useEffect(() => {
    if (isRematchReceived && isRematchSent) {
      navigate(props.sendTo, {replace: true});
    }
  }, [isRematchReceived, isRematchSent]);

  return (
    <>
      {
        isRematchSent && <p>Rematch Request Sent</p>
        || isGameDone &&
        <button onClick={requestRematch}>
            Rematch
        </button>
      }
      {
        isRematchReceived && <p>Rematch Requested By {socketContext.opponent.current}</p>
      }
    </>
  );
}

export default RematchButton;