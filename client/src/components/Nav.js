import NavBar from './NavBar.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Dict from "./pages/Dict.js";
import Error from "./pages/Error.js";
import SinglePlayerWordle from "./pages/SinglePlayerWordle.js";
import MultiPlayerWordle from "./pages/MultiPlayerWordle.js";
import AboutUs from './pages/AboutUs.js';
import Profile from "./pages/Profile.js";
import LogIn from './pages/LogIn.js';

function Nav(props) {
  return(
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/dict" exact element={<Dict/>} />
          <Route path="/wordle" exact element={<SinglePlayerWordle/>} />
          <Route path="/wordle-online/*" exact element={<MultiPlayerWordle/>}/>
          <Route path="/about" exact element={<AboutUs/>} />
          <Route path="/profile" 
            exact element={props.userName ? <Profile/> : <Navigate to="/login"/>} />
          <Route path="/login" exact element={<LogIn/>} />
          <Route path="/*" exact element= {<Error/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default Nav;