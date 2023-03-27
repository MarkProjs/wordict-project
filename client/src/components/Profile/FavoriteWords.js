import { Link } from "react-router-dom";

function FavoriteWords(props) {
  // const mockData = [{ word: 'happy' }, { word: 'rooty' }, { word: 'earthworm' }];
  // might need props to receive favorite words, or fetch from db here
  return (
    <article className="favorites">
      <h2>Favorite Words</h2>
      <ul>
        {props.favoriteWords.map((item, key) =>
          <li key={key}>
            <Link to="/dict" state={{ word: item }}>{item}</Link>
          </li>)}
      </ul>
    </article>
  );
}

export default FavoriteWords;