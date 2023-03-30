import "./Login.css";
import LogBtn from "../LogBtn";
function Login(props) {
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      <div>
        <LogBtn 
          handleLogin = {props.handleLogin}
        />
      </div>
    </div>
  );
}

export default Login;