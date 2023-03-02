import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

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
    let url = new URL(`/api/${e.target.word.value.toLowerCase()}/definition`, location.origin);
    await findWord(url);
  }

  /**
   * Search word definition of given word
   * @param {String} word 
   */
  async function searchGivenWord(word) {
    let url = new URL(`/api/${word.toLowerCase()}/definition`, location.origin);
    await findWord(url);
  }

  /**
   * Fetch word definition from api
   * @param {URL} url 
   */
  async function findWord(url) {
    let data;
    try {
      let response = await fetch(url)
      data = await response.json()
    } catch (e) {
      data = { "word": "No results" }
    }
    setSearchResult(data)
  }

  useEffect(() => {
    /**
     * Fetch all words from api
     */
    async function getData() {
      let url = new URL(`/api/dictionary`, location.origin);
      let data;
      try {
        let response = await fetch(url);
        data = await response.json();
      } catch (e) {
        data = [];
        console.error(e);
      }
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