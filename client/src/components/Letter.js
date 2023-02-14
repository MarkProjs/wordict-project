import { useEffect, useState } from "react";
import "./Letter.css"

function Letter(props) {
  const [letter, setLetter] = useState(" ");

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