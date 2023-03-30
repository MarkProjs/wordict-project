import "./Login.css";
import LogBtn from "../LogBtn";
function Login() {
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      <div>
        <LogBtn />
      </div>
    </div>
  );
}

export default Login;