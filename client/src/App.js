import './App.css';
import Nav from "./components/Nav.js";
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPic, setUserPic] = useState("/img/default.jpg");
  

  //handle the login
  const handleLogin = async googleData =>{
    const res = await fetch("/auth", {
      method: "POST",
      body: JSON.stringify({token: googleData.credential}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    // server will be replying with the info
    const data = await res.json();
    console.log(data);
    setUserName(data.user.name);
    setUserEmail(data.user.email);
    setUserPic(data.user.picture);
  }

  //handle log out, nothing to do with google, only has to do with the
  //session on the Express server
  const handleLogout = async () => {
    await fetch("/logout");
    setUserName("");
    setUserEmail("");
    setUserPic("/img/default.jpg");
  }

  //protected route callback
  const protectedRoute = async () => {
    const resp = await fetch("/protected");
    if(resp.status === 200) {
      // eslint-disable-next-line no-alert
      alert("You are authorized to see this");
    } else if (resp.status === 401) {
      // eslint-disable-next-line no-alert
      alert("You are not authorized to see this!");
    } else {
      // eslint-disable-next-line no-alert
      alert("Something went wrong!");
    }
  }

  
  return (
    <div className="App">
      <div className="header">
        <h1 id="title"><a href="/">WORDICT</a></h1>
        <div className="logBtn">
          <img src={userPic} style={{width: 50, height: 50}} referrerPolicy="no-referrer"/>
          {userName && <button onClick={handleLogout}>Logout</button>}
          <button onClick={protectedRoute}>Test protected</button>
        </div>
      </div>
      <Nav 
        userName = {userName}
        handleLogin = {handleLogin}
      />
    </div>
  );
}

export default App;
