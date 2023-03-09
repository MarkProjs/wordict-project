import { useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';

function SignIn() {
  const [username, setUserName] = useState("");

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
  return(
    <div>
      <h2>Welcome {username ? username : "Anonymous"}</h2>
      {!username && 
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() =>{
          console.log('Loging Failed');
        }}
      /> }
      {username && <button onClick={handleLogout}>Logout</button>}
      <button onClick={protectedRoute}>Test protected</button>
    </div>
  );

}

export default SignIn;