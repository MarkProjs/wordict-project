import {useState} from 'react'

function SearchBar() {

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return <div>
    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />    
  </div>

}

export default SearchBar;