import { useContext } from 'react';
import LogInBtn from './LogInBtn';
import UserContext from '../userContext';
import FetchModule from '../controllers/FetchModule';


function UserMenu() {
  const user = useContext(UserContext);

  const logOutStyle = {
    color: "#fff",
    background: "#256ce1",
    padding: "10px 22px",
    border: "none",
    outline: "none",
  }
  //handle the logout for google authentcation
  async function handleLogout(e) {
    e.target.disabled = true
    await FetchModule.handleLogout();
    user.setIsLoggedIn(false);
  }

  return (
    <div className="profile-login">
      <LogInBtn />
      {user.isLoggedIn && <button onClick={handleLogout} style={logOutStyle}>Logout</button>}
    </div>
  );
}

export default UserMenu