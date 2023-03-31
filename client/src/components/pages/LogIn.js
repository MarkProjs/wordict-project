import "./Login.css";
import LogInBtn from "../LogInBtn";
function Login() {
  return(
    <div className="login">
      <h1>You are not logged in!</h1>
      <p>You can log in via: </p>
      <div>
        <LogInBtn />
      </div>
    </div>
  );
}

export default Login;