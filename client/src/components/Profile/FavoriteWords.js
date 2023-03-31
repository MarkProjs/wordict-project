import { Link } from "react-router-dom";

function FavoriteWords(props) {
  function setDisplay() {
    if (props.favoriteWords && props.favoriteWords.length > 0) {
      return props.favoriteWords.map((item, key) =>
        <li key={key}>
          <Link to="/dict" state={{ word: item }}>{item}</Link>
        </li>)
    } else {
      return <p>Your favorite words list is empty.
        Head to our <Link to="/dict">dictionary</Link> to add words!</p>;
    }
  }

  return (
    <article className="favorites">
      <h2>Favorite Words</h2>
      <ul>
        {setDisplay()}
      </ul>
    </article>
  );
}

export default FavoriteWords;