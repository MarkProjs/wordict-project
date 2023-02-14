import React, {useState} from 'react'


const SearchBar = () => {

  const [searchInput, setSearchInput] = useState("");

  const words = [
    { word: "hello", definition: "a greeting" },
    { word: "draw", definition: "to draw" },
    { word: "definition", definition: "meaning of a word" },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  // if (searchInput.length > 0) {
  //   words.filter((word) => {
  //     if (word.word === searchInput){
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  return <div>

    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />    

    {/* {words.map((word, index) => {
      console.log(searchInput);
      console.log("in map: " + word.word);
    })} */}

  </div>


};

export default SearchBar;