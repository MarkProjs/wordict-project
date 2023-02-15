import React from 'react';

function NavBar() {
  return(
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="">
            <h1>Home</h1>
          </NavLink>
          <NavLink to="" activeStyle>
            Dictionary
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signup">Sign up</NavBtnLink>
        </NavBtn>
      </Nav>
      {/* <ul>
        <li>Home</li>
        <li>Dictionary</li>
        <li>Play Wordle!</li>
        <li>Play Wordle Online</li>
        <li>Leaderboard</li>
        <li>About!</li>
      </ul> */}
    </>
  );
}

export default NavBar;