import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(props.userName !== "" && location.pathname === "/login") {
      navigate("/profile", {replace:true});
    }
  }, [location.pathname]);
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
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
  );
}

export default Login;