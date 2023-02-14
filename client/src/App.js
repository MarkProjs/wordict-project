import logo from './logo.svg';
import './App.css';
import Wordle from './components/Wordle';

function App() {
  return (
    <div className="App">
      <Wordle attempts={6} wordLength={5}/>
    </div>
  );
}

export default App;
