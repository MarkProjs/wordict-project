import './App.css';
import Header from "./components/Header.js";
import NavBar from "./components/NavBar.js";
import Home from "./components/NavBarElem/Home.js";

function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <Home/>

      
    </div>
  );
}

export default App;
