import { useState } from "react";

function GameSettings(props) {

  const [word, setWord] = useState("");
  const [isWordValid, setIsWordValid] = useState(true);

  function randomiseWord(e) {
    e.preventDefault();
    let wordNum = Math.floor(Math.random() * props.allWords.current.length);
    setWord(props.allWords.current[wordNum.valueOf()]);
    e.target.parentNode.word.setCustomValidity("");
  }

  function handleSend(e) {
    e.preventDefault();
    console.log("testtest " + word)
    if (props.allWords.current.includes(word)) {
      setIsWordValid(true); 
      console.log(word);
    } else {
      setIsWordValid(false);
      e.target.word.setCustomValidity("That word is not in our dictionary");
      e.target.word.reportValidity();
    }

  }

  return (
    <form onSubmit={e => {handleSend(e)
      console.log("SUBMIT")
    }}>
      <label htmlFor="word">Opponent&apos;s Word: </label>
      <input required 
        value={word} onInput={(e) => {setWord(e.target.value)
          e.target.setCustomValidity("");
        }} name="word"/>
      <button>Send</button>
      <br/>
      <button onClick={e => randomiseWord(e)}>Randomise</button>
    </form>
  );
}

export default GameSettings;