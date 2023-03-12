import { useState } from "react";

function GameSettings(props) {

  const [word, setWord] = useState("");

  /**
   * Randomise the word in the input field
   * @param {Event} e The button click event
   */
  function randomiseWord(e) {
    e.preventDefault();
    let wordNum = Math.floor(Math.random() * props.allWords.current.length);
    setWord(props.allWords.current[wordNum.valueOf()]);
    e.target.parentNode.word.setCustomValidity("");
  }

  /**
   * Send the chosen word to the specified send funtion given by props
   * or display a custom invalid message
   * @param {Event} e Form Submit event
   */
  function handleSend(e) {
    e.preventDefault();
    if (props.allWords.current.includes(word)) {
      console.log(word);
      props.send(word);
    } else {
      e.target.word.setCustomValidity("That word is not in our dictionary");
      e.target.word.reportValidity();
    }
  }

  /**
   * Set the state of the word input field to whatever it is changed to
   * and remove its invalidity
   * @param {Event} e The input event for the word input field
   */
  function handleWordInput(e) {
    setWord(e.target.value)
    e.target.setCustomValidity("");
  }

  return (
    <form onSubmit={e => handleSend(e)}>
      <label htmlFor="word">Opponent&apos;s Word: </label>
      <input required value={word} onInput={e => handleWordInput(e)} name="word"/>
      <button>Send</button>
      <br/>
      <button onClick={e => randomiseWord(e)}>Randomise</button>
    </form>
  );
}

export default GameSettings;