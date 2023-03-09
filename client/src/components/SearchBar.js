import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import FetchModule from '../controllers/FetchModule';

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [words, setWords] = useState([]);
  const locationData = useLocation();

  // Set the linked word from favorites as search input and searches definition
  if (locationData.state !== null) {
    let favoriteWord = locationData.state.word;
    // Set searchInput which is used to set value in the search input field
    setSearchInput(favoriteWord);
    // Search word and display definition
    searchGivenWord(favoriteWord);
    // Prevent from running more than once (line 11)
    locationData.state = null;
  }

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
   * Search word definition of given word
   * @param {String} word 
   */
  async function searchGivenWord(word) {
    await findWord(word);
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
    /**
     * Fetch all words from api
     */
    async function getData() {
      let data = await FetchModule.fetchAllWords();
      setWords(data);
    }
    getData();
  }, []);

  const dataList = <datalist id="words">
    {words.map((item, key) =>
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