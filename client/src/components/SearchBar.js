import {useState} from 'react'

function SearchBar() {

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const words = [{word: 'hi'}, {word: 'foo'}, {word: 'bar'}, {word: 'monkey'}];
  const dataList = <datalist id="words">
    {words.map((item, key) =>
      <option key={key} value={item.word} />
    )}
  </datalist>;

  return <div>
    <input
      type="search"
      placeholder="Search here"
      list="words"
      onChange={handleChange}
      value={searchInput}
    />
    {dataList}
  </div>

}

export default SearchBar;