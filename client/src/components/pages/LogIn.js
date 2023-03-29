import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css"
function Login(props) {
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          {!props.userName && 
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