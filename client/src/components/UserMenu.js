import { useContext } from 'react';
import LogInBtn from './LogInBtn';
import UserContext from '../userContext';
import FetchModule from '../controllers/FetchModule';


function UserMenu() {
  const user = useContext(UserContext);

  //handle the logout for google authentcation
  async function handleLogout(e) {
    e.target.disabled = true
    await FetchModule.handleLogout();
    user.setIsLoggedIn(false);
  }

  return (
    <div className="profile login">
      <img src={user.picture} style={{ width: 50, height: 50 }} referrerPolicy="no-referrer" />
      <LogInBtn />
      {user.isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default UserMenu