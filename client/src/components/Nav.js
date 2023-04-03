import NavBar from './NavBar.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Dict from "./pages/Dict.js";
import Error from "./pages/Error.js";
import SinglePlayerWordle from "./pages/SinglePlayerWordle.js";
import MultiPlayerWordle from "./pages/MultiPlayerWordle.js";
import LeaderBoard from "./pages/Leaderboard.js"
import AboutUs from './pages/AboutUs.js';
import Profile from "./pages/Profile.js";
import LogIn from './pages/LogIn.js';
import userContext from '../userContext.js';
import { useContext } from 'react';

function Nav() {
  const user = useContext(userContext);
  return(
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/dict" exact element={<Dict/>} />
          <Route path="/wordle" exact element={<SinglePlayerWordle/>} />
          <Route path="/wordle-online/*" exact element={<MultiPlayerWordle/>}/>
          <Route path="/leaderboard" exact element={<LeaderBoard/>}/>
          <Route path="/about" exact element={<AboutUs/>} />
          <Route path="/profile" 
            exact element={user.isLoggedIn ? <Profile/> : <Navigate to="/login"/>} />
          <Route path="/login" exact element={user.isLoggedIn ? <Profile/> : 
            <LogIn />} />
          <Route path="/*" exact element= {<Error/>}/>
        </Routes>
      </Router> 
    </>
  );
}

export default Nav;