import { Nav, NavLink, Bars, 
  NavMenu, NavBtn, NavBtnLink } from './NavbarElem.js';

function NavBar() {
  return(
    <>
      <Nav>
        <Bars />
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
      </Nav>
    </>
  );
}

export default NavBar;