import './App.css';
import Header from "./components/Header.js";
import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [userName, setUserName] = useState("");
  

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
  }

  //handle log out, nothing to do with google, only has to do with the
  //session on the Express server
  const handleLogout = async () => {
    await fetch("/logout");
    setUserName("");
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
      <div className="title">
        <h1>WORDICT</h1>
        <h2>Welcome {userName ? userName : "Anonymous"}</h2>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          {!userName && 
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() =>{
              console.log('Login Failed');
            }}
          /> }
          {userName && <button onClick={handleLogout}>Logout</button>}
          <button onClick={protectedRoute}>Test protected</button>
        </GoogleOAuthProvider>
      </div>
      <Header/>
    </div>
  );
}

export default App;
