import { useEffect, useState } from 'react'

function SearchBar() {

  const [searchResult, setSearchResult] = useState();
  const [words, setWords] = useState([]);

  // const [searchInput, setSearchInput] = useState("");
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  // };

  /**
   * Fetch word definition from api
   * @param {form} e 
   */
  async function findWord(e) {
    e.preventDefault()
    let url = new URL(`/api/${e.target.word.value.toLowerCase()}/definition`, location.origin)
    let data;
    try {
      let response = await fetch(url)
      data = await response.json()
    } catch (e) {
      data = { "word": "No results" }
    }
    setSearchResult(data)
  }

  // fetch words via api
  useEffect(() => {
    let url = new URL(`/api/dictionary`, location.origin);
    fetch(url).
      then((response) => response.json()).
      then(setWords).
      catch(console.error);
  }, []);

  const dataList = <datalist id="words">
    {words.map((item, key) => <option key={key} value={item} />
    )}
  </datalist>;

  return (
    <>
      <form onSubmit={findWord}>
        <input
          type="search"
          name="word"
          placeholder="Search here"
          list="words"
        // onChange={handleChange}
        // value={searchInput}
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