import { useEffect, useState, useTransition, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import FetchModule from '../controllers/FetchModule';
import userContext from '../userContext.js';
import './SearchBar.css';

function SearchBar() {
  const user = useContext(userContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [filteredWords, setFilteredWords] = useState([]);
  const locationData = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isFetching = useRef();
  const aborter = useRef(new AbortController())
  const unfavoritedIcon = process.env.PUBLIC_URL + '/img/star_FILL0.svg';
  const favoritedIcon = process.env.PUBLIC_URL + '/img/star_FILL1.svg';

  // Search input field with default value attribute set to searchInput (favorite word / no word)
  let searchInputField = <input
    type="search"
    name="word"
    placeholder="Search here"
    list="words"
    defaultValue={searchInput}
    onChange={inputUpdate}
  />;


  async function inputUpdate(event) {
    let newValue = event.target.value;
    if (newValue && !isPending) {
      startTransition(() => {
        (async () => {
          if (isFetching.current) {
            aborter.current.abort();
            aborter.current = new AbortController();
          }
          isFetching.current = true;
          let words = await FetchModule.fetchWordsStartWith(newValue, aborter.current.signal);
          isFetching.current = false;

          setFilteredWords(words);
        })()
      });
    }
    setSearchInput(newValue);
  }

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
    setSearchInput(word);
    let data = await FetchModule.fetchDefinition(word);
    if (data === null) {
      data = { "word": "No results" };
    }
    setSearchResult(data);
    // Fetch only if user is logged in
    if (user.isLoggedIn) {
      let userData = await FetchModule.fetchUserFavorites();
      if (userData.favoriteWords.find(elem => elem === word)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
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
    })();
  }, []);

  const dataList = <datalist id="words">
    {
      filteredWords.map((item, key) => <option key={key} value={item} />)
    }
  </datalist>;

  /**
   * Handler for favorite button
   */
  async function favoriteHandler() {
    setIsFavorite(!isFavorite);
    let data = { word: searchInput, favorite: isFavorite };
    await FetchModule.updateUserFavoriteWords(data);
  }

  return (
    <>
      <form onSubmit={searchWord}>
        {searchInputField}
        <input type="submit" value="Search" />
        {searchInput ? dataList : <></>}
      </form>
      {searchResult ? <div className='definition'>
        <div className='definition-top'>
          {user.isLoggedIn ?
            <img className='favorite' src={isFavorite ? favoritedIcon : unfavoritedIcon}
              alt='favorite button' onClick={favoriteHandler} /> : <></>
          }
          <h2>{searchResult.word}</h2>
        </div>
        <ol >
          {searchResult.definitions ? searchResult.definitions.map((item, key) =>
            <li className='definition-line' key={key}>{item.definition}</li>
          ) : <></>}
        </ol>
      </div> : <></>}
    </>
  )
}

export default SearchBar;