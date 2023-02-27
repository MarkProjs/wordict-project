function FavoriteWords() {
  const mockData = [{ word: 'one' }, { word: 'happy' }, { word: 'rooty' }];
  // might need props to receive favorite words, or fetch from db here
  return (
    <section className="favorites">
      <ul>
        {mockData.map((item, key) =>
          <li key={key}>
            <a href={"/" + item.word + "/definition"}>{item.word}</a>
          </li>)}
      </ul>
    </section>
  );
}

export default FavoriteWords;