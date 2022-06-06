import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.components.jsx";

import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState(""); //[value, setValue]
  const [monsters, setMonsters] = useState([]);

  // if initial values of monsters ever chasnges to some default values; hence setting default value to monsters
  const [filteredMonsters, setFilteredMonster] = useState(monsters);

  // we only want to fetch once the component is mounted; hence [] dependency array
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // sets the value of searchField to searched string
  const onSearchChange = (event) => {
    // value getting from the UI
    const searchFieldString = event.target.value.toLocaleLowerCase();

    // sets searchField = searchFieldString
    setSearchField(searchFieldString);
  };

  // returns monsters matching the entered searched string
  useEffect(() => {
    const newFilteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonster(newFilteredMonster);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="Input monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
