import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import userContext from "../userContext";
import { useContext } from 'react';


function LogBtn(props) {
  const user = useContext(userContext);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {!user.username &&
                <GoogleLogin
                  onSuccess={props.handleLogin}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  cookiePolicy={"single_host_origin"}
                />
      }
    </GoogleOAuthProvider>
  );
}

export default LogBtn;