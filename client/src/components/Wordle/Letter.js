import { useEffect, useState } from "react";
import "./Letter.css"

function Letter(props) {
  const [letter, setLetter] = useState({});

  useEffect(() => {
    // Set the letter to the default upon rerender from parent (reset)
    setLetter({ style: "", key: props.defaultValue })
    // Subscribe to the parent state event with the state function
    props.subToStateEvent(props.id, setLetter);
  }, [props]);

  return (
    <div className={`letter-box ${letter.style} `}>
      <p>
        {letter.key}
      </p>
    </div>
  );
}

export default Letter;