import NavBar from './NavBar.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Dict from "./pages/Dict.js";
import Error from "./pages/Error.js";
import SinglePlayerWordle from "./pages/SinglePlayerWordle.js";
import MultiPlayerWordle from "./pages/MultiPlayerWordle.js"

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
          <Route path="/*" exact element= {<Error/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default Header;