import { useState } from 'react';
import { Link } from "react-router-dom";

function FavoriteWords() {
  const mockData = [{ word: 'one' }, { word: 'happy' }, { word: 'rooty' }];
  const [data, setData] = useState({
    id: "1t4",
    title: " How to pass state in react-router-dom",
    tag: ["reactjs", "react-router-dom"],
    words: mockData
  }); 
  // might need props to receive favorite words, or fetch from db here
  return (
    <section className="favorites">
      <ul>
        {mockData.map((item, key) =>
          <li key={key}>
            {/* <a href={"/" + item.word + "/definition"}>{item.word}</a> */}
            <Link
              to="/dict" state={{ data: item }}
            >{item.word}</Link>
          </li>)}
      </ul>
    </section>
  );
}

export default FavoriteWords;