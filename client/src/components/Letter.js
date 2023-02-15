import { useEffect, useState } from "react";
import "./Letter.css"

function Letter(props) {
  const [letter, setLetter] = useState(props.defaultValue);

  useEffect(() => {
    props.addLetter(setLetter);
  }, []);

  return (
    <p className="letter-box">
      {letter}
    </p>
  );
}

export default Letter;