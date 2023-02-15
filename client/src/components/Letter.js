import { useEffect, useState } from "react";
import "./Letter.css"

function Letter(props) {
  const [letter, setLetter] = useState({style: "", key: props.defaultValue});

  useEffect(() => {
    props.addLetter(setLetter);
  }, []);

  return (
    <p className={`letter-box ${letter.style}`}>
      {letter.key}
    </p>
  );
}

export default Letter;