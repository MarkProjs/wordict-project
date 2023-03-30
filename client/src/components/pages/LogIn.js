import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css";
import userContext from "../../userContext.js";
import { useContext } from 'react';
function Login(props) {
  const user = useContext(userContext);
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          {!user.username && 
            <GoogleLogin 
              onSuccess={props.handleLogin}
              onError={()=>{
                console.log('Login Failed');
              }}
              cookiePolicy={"single_host_origin"}
            />
          }
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default Login;