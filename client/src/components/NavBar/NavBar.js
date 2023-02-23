import '../../NavBar.css';
import { NavLink, 
  NavMenu, NavBtn, NavBtnLink } from './NavbarElem.js';
import { NavLink as Link } from 'react-router-dom';

function NavBar() {
  return(
    <>
      <nav className='Nav'>
        <NavMenu>
          <NavLink to='/'>
            <h1>Home</h1>
          </NavLink>
          <NavLink to="/dict" activestyle="true">
            Dictionary
          </NavLink>
          <NavLink to="/wordle" activestyle="true">
            Wordle
          </NavLink>
          <NavLink to="/wordle-online" activestyle="true">
            Wordle Online
          </NavLink>
          <NavLink to="/about" activestyle="true">
            About Us
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="">Sign up</NavBtnLink>
        </NavBtn>
      </nav>
    </>
  );
}

export default NavBar;