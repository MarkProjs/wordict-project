import './App.css';
import Nav from "./components/Nav.js";
import { useEffect, useState } from 'react';
import UserContext from './userContext';
import UserMenu from './components/UserMenu';
import FetchModule from './controllers/FetchModule';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [userPic, setUserPic] = useState("/img/default.jpg");
  
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const user = (await FetchModule.fetchUser()).user;
        setUserPic(user.picture);
        setUsername(user.name);
      })();
    } else {
      setUserPic("/img/default.jpg");
      setUsername("Guest");
    }
    
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ 
      username: username, 
      picture: userPic, 
      isLoggedIn: isLoggedIn, 
      setIsLoggedIn: setIsLoggedIn
    }}>
      <div className="App">
        <div className="header">
          <h1 id="title"><a href="/">WORDICT</a></h1>
          <UserMenu/>
        </div>
        <Nav/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
