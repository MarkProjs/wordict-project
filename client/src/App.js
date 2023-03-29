import './App.css';
import Header from "./components/Header.js";
import PreviousPageContext from './components/NavigationExtra/PreviousPageContext';

function App() {

  return (
    <div className="App">
      <PreviousPageContext.Provider value={{}}>
        <Header/>
      </PreviousPageContext.Provider>
    </div>
  );
}

export default App;
