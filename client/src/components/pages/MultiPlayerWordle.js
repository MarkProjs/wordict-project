import { useEffect, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SocketForm from '../Sockets/SocketForm.js';
import FetchModule from '../../controllers/FetchModule.js';
import "./MultiPlayerWordle.css"
import GameSettings from '../Sockets/GameSettings.js';
import SocketContext from '../Sockets/SocketContext.js';
import GameBoard from '../Sockets/GameBoard.js';

function MultiPlayerWordle() {

  const socket = useRef(undefined);
  const allWords = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch all the valid words in our dictionary
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

  // If they navigate to the wordle-online page, send them to the connect page.
  useEffect(() => {
    // Fix to use regex
    if (location.pathname === "/wordle-online") {
      navigate("/wordle-online/connect", {replace: true});
    }
  }, [location.pathname]);
  

  // DISABLE SOME BUTTON TO AVOID SPAM
  return (
    <div>
      <SocketContext.Provider value={{socket: socket}}>
        <Routes>
          <Route path="connect" exact element={<SocketForm/>} />
          <Route path="startup" exact element= {
            <GameSettings allWords={allWords}/>
          } />
          <Route path="game" exact element={<GameBoard/>} />
        </Routes>
        <Outlet/>
      </SocketContext.Provider>
    </div>
  );
}

export default MultiPlayerWordle;
