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
    console.log(favoriteWord);
    setSearchInput(favoriteWord);
    searchGivenWord(favoriteWord);
    // Prevent from running more than once
    locationData.state = null;
  }

  // Allow search input to update on change
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

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
        <input
          type="search"
          name="word"
          placeholder="Search here"
          list="words"
          onChange={handleChange}
          value={searchInput}
        />
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