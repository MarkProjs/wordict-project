import { useEffect, useState } from "react";
import "./Letter.css"

function Letter(props) {
  const [letter, setLetter] = useState({style: "", key: props.defaultValue});

  useEffect(() => {
    // Subscribe to the parent state event with the state function
    props.subToStateEvent(setLetter);
  }, []);

  return (
    <p className={`letter-box ${letter.style}`}>
      {letter.key}
    </p>
  );
}

export default Letter;