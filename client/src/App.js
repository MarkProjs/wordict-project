import './App.css';
import Nav from "./components/Nav.js";
import LogBtn from './components/LogBtn';
import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import UserContext from './userContext';
import FetchModule from './controllers/FetchModule';

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPic, setUserPic] = useState("/img/default.jpg");



  //handle the login
  async function handleLogin(googleData) {
    let data = await FetchModule.handleLogin(googleData);
    console.log(data);
    setUserName(data.user.name);
    setUserEmail(data.user.email);
    setUserPic(data.user.picture);
  }

  //handle the logout for google authentcation
  async function handleLogout() {
    await FetchModule.handleLogout();
    setUserName("");
    setUserEmail("");
    setUserPic("/img/default.jpg");
  }

  return (
    <UserContext.Provider value={{ username: userName, email: userEmail, picture: userPic }}>
      <div className="App">
        <div className="header">
          <h1 id="title"><a href="/">WORDICT</a></h1>
          <div className="profile login">
            <img src={userPic} style={{ width: 50, height: 50 }} referrerPolicy="no-referrer" />
            <LogBtn
              handleLogin = {handleLogin} 
            />
            {userName && <button onClick={handleLogout}>Logout</button>}
          </div>
        </div>
        <Nav
          handleLogin={handleLogin}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
