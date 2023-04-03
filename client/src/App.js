import './App.css';
import Nav from "./components/Nav.js";
import { useEffect, useState } from 'react';
import UserContext from './userContext';
import FetchModule from './controllers/FetchModule';
import PreviousPageContext from './components/NavigationExtra/PreviousPageContext';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [userPic, setUserPic] = useState("/img/default.jpg");
  
  useEffect(() => {
    (async () => {
      //for some reason this is not infinite, only runs ~3 times
      //be carefull tho O_o
      const user = await FetchModule.fetchUser();
      setUserPic(user.picture ?  user.picture : "/img/default.jpg");
      setUsername(user.name ? user.name : "Guest");
      user.name ? setIsLoggedIn(true) : setIsLoggedIn(false);
    })();
    
  }, [isLoggedIn]);

 

  return (
    <PreviousPageContext.Provider value={{}}>
      <UserContext.Provider value={{ 
        username: username, 
        picture: userPic, 
        isLoggedIn: isLoggedIn, 
        setIsLoggedIn: setIsLoggedIn
      }}>
        <div className="App">
          <Nav/>
        </div>
      </UserContext.Provider>
    </PreviousPageContext.Provider>
  );
}

export default App;
