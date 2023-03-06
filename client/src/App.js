import './App.css';
import Header from "./components/Header.js";
import { GoogleLogin } from '@react-oauth/google';

function App() {
  const handleLogin = async googleData =>{
    const res = await fetch("/auth", {
      method: "POST",
      body: JSON.stringify({token: googleData.credential}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
  }

  const handleError = error => {
    console.error(error);
  }

  return (
    <div className="App">
      <Header/>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={handleError} 
      />
    </div>
  );
}

export default App;
