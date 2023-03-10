import { useState } from "react";

function GameSettings(props) {

  const [word, setWord] = useState("");

  function randomiseWord(e) {
    e.preventDefault();
    console.log(props)
    let wordNum = Math.floor(Math.random() * props.allWords.current.length);
    setWord(props.allWords.current[wordNum.valueOf()]);
  }

  function handleSend(e) {
    e.preventDefault();
    console.log(word);
  }

  return (
    <form onSubmit={e => handleSend(e)}>
      <label htmlFor="word">Opponent&apos;s Word</label>
      <input value={word} onInput={(e) => setWord(e.target.value)} name="word"/>
      <button>Send</button>
      <button onClick={e => randomiseWord(e)}>Send Random</button>
    </form>
  );
}

export default GameSettings;