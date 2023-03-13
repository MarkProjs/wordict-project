import { Link } from "react-router-dom";

function FavoriteWords() {
  const mockData = [{ word: 'happy' }, { word: 'rooty' }, { word: 'earthworm' }];
  // might need props to receive favorite words, or fetch from db here
  return (
    <article className="favorites">
      <h2>Favorite Words</h2>
      <ul>
        {mockData.map((item, key) =>
          <li key={key}>
            <Link to="/dict" state={{ word: item.word }}>{item.word}</Link>
          </li>)}
      </ul>
    </article>
  );
}

export default FavoriteWords;