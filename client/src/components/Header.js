import NavBar from './NavBar.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Dict from "./pages/Dict.js";
import Error from "./pages/Error.js";
import SinglePlayerWordle from "./pages/SinglePlayerWordle.js";
import MultiPlayerWordle from "./pages/MultiPlayerWordle.js";
import AboutUs from './pages/AboutUs.js';
import Profile from "./pages/Profile.js";
import SignIn from './pages/SignIn.js';

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
          <Route path="/wordle-online" exact element={<MultiPlayerWordle/>} />
          <Route path="/about" exact element={<AboutUs/>} />
          <Route path="/profile" exact element={<Profile/>} />
          <Route path="/signIn" exact element={<SignIn/>} />
          <Route path="/*" exact element= {<Error/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default Header;