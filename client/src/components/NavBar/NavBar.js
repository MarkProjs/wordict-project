import '../../NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return(
    <>
      <nav className='Nav'>
        <div className='NavMenu'>
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
        </div>
        <nav className='NavBtn'>
          <NavLink to="" className='NavBtnLink'>Sign up</NavLink>
        </nav>
      </nav>
    </>
  );
}

export default NavBar;