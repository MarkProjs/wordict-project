import './NavBar.css';
import { NavLink } from 'react-router-dom';
import usePreviousPage from './NavigationExtra/usePreviousPage';
import UserMenu from './UserMenu';

function NavBar() {
  usePreviousPage();
  return(
    <>
      <nav className='Nav'>
        <NavLink to='/' className='title'>
          <h1>WORDICT</h1>
        </NavLink>
        <div className='NavMenu'>
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
        <UserMenu/>
      </nav>
    </>
  );
}

export default NavBar;