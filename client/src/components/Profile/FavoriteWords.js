import { Link } from "react-router-dom";

function FavoriteWords() {
  const mockData = [{ word: 'happy' }, { word: 'rooty' }, { word: 'earthworm' }];
  // might need props to receive favorite words, or fetch from db here
  return (
    <section className="favorites">
      <ul>
        {mockData.map((item, key) =>
          <li key={key}>
            <Link to="/dict" state={{ word: item.word }}>{item.word}</Link>
          </li>)}
      </ul>
    </section>
  );
}

export default FavoriteWords;