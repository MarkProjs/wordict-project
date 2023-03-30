import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import userContext from "../userContext";
import { useContext } from 'react';
import FetchModule from "../controllers/FetchModule";

function LogBtn() {
  const user = useContext(userContext);
  //handle the login
  async function handleLogin(googleData) {
    await FetchModule.handleLogin(googleData);
    user.setIsLoggedIn(true);
  }
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {!user.isLoggedIn &&
        <GoogleLogin
          onSuccess={handleLogin}
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