import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Login(props) {
  <div>
    <h1>You are not logged in!</h1>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin 
        onSuccess={props.handleLogin}
        onError={()=>{
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
    
  </div>
}

export default Login;