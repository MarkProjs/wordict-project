import { useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';

function SignIn() {
  const [username, setUserName] = useState("");

  //ahndle the login
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

  //handle the error that will print in the console
  const handleError = error => {
    console.error(error);
  }
  return(
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={handleError} 
      />
    </div>
  );

}

export default SignIn;