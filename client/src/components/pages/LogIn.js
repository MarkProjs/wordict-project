import { GoogleLogin } from "@react-oauth/google";
function Login(props) {
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      {!props.userName && 
        <GoogleLogin 
          onSuccess={props.handleLogin}
          onError={()=>{
            console.log('Login Failed');
          }}
          cookiePolicy={"single_host_origin"}
        />
      }
    </div>
  );
}

export default Login;