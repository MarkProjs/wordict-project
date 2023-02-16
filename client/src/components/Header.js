import NavBar from "./NavBar/NavBar.js";
import { BrowserRouter as Router } from "react-router-dom";

function Header() {
  return(
    <>
      <div className="title">
        WORDICT
      </div>
      <Router>
        <NavBar/>
      </Router>
      
    </>
  );
}

export default Header;