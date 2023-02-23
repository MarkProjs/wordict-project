import NavBar from './NavBar/NavBar.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Dict from "./pages/Dict.js";
import SinglePlayerWordle from './pages/SinglePlayerWordle.js';
import Profile from "./pages/Profile.js";

function Header() {
  return(
    <>
      <div className="title">
        WORDICT
      </div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/dict" exact element={<Dict/>} />
          <Route path="/wordle" exact element={<SinglePlayerWordle/>} />
          <Route path="/profile" exact element={<Profile/>} />
        </Routes>
      </Router>
      
    </>
  );
}

export default Header;