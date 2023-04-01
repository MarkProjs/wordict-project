import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import FetchModule from '../controllers/FetchModule';

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [words, setWords] = useState([]);
  const [renderedWords, setRenderedWords] = useState([]);
  const locationData = useLocation();

  // Search input field with default value attribute set to searchInput (favorite word / no word)
  let searchInputField = <input
    type="search"
    name="word"
    placeholder="Search here"
    list="words"
    defaultValue={searchInput}
  />;

  /**
   * Search word definition via form submission using event
   * @param {form} e 
   */
  async function searchWord(e) {
    e.preventDefault()
    await findWord(e.target.word.value);
  }

  /**
   * Fetch word definition from api
   * @param {URL} url 
   */
  async function findWord(word) {
    let data = await FetchModule.fetchDefinition(word);
    if (data === null) {
      data = { "word": "No results" };
    }
    setSearchResult(data);
  }

  useEffect(() => {
    (async () => {
      // Set the linked word from favorites as search input and searches definition
      if (locationData.state !== null) {
        let favoriteWord = locationData.state.word;
        // Set searchInput which is used to set value in the search input field
        setSearchInput(favoriteWord);
        // Search word and display definition
        await findWord(favoriteWord);
        locationData.state.word = null;
        window.history.replaceState({}, document.title)
      }

      // Fetch all the words for the dataset
      let data = await FetchModule.fetchAllWords();
      setWords(data);
    })();
  }, []);

  useEffect(() => {
    //render 100 words at a time
    const increment = 100;
    const wordsToRender = words.slice(0, renderedWords.length + increment);

    if (wordsToRender.length !== renderedWords.length) {
      setRenderedWords(wordsToRender);
    }
  }, [words, renderedWords]);

  const dataList = <datalist id="words">
    {renderedWords.map((item, key) =>
      <option key={key} value={item} />
    )}
  </datalist>;

  return (
    <>
      <form onSubmit={searchWord}>
        {searchInputField}
        <input type="submit" value="Search" />
        {dataList}
      </form>
      {searchResult ? <div className='definition'>
        <h2>{searchResult.word}</h2>
        <ol>
          {searchResult.definitions ? searchResult.definitions.map((item, key) =>
            <li key={key}>{item.definition}</li>
          ) : <></>}
        </ol>
      </div> : <></>}
    </>
  )
}

export default SearchBar;