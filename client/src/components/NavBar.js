import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return(
    <>
      <nav className='Nav'>
        <div className='NavMenu'>
          <NavLink to='/' className='mainNavLink'>
            <h1>Home</h1>
          </NavLink>
          <NavLink to="/dict" activestyle="true" className='mainNavLink'>
            Dictionary
          </NavLink>
          <NavLink to="/wordle" activestyle="true" className='mainNavLink'>
            Wordle
          </NavLink>
          <NavLink to="/wordle-online" activestyle="true" className='mainNavLink'>
            Wordle Online
          </NavLink>
          <NavLink to="/leaderboard" activestyle="true" className='mainNavLink'>
            Leaderboard
          </NavLink>
          <NavLink to="/profile" activestyle="true" className='mainNavLink'>
            Profile
          </NavLink>
          <NavLink to="/about" activestyle="true" className='mainNavLink'>
            About Us
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default NavBar;