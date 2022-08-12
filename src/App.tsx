import { useState, useEffect, ChangeEvent } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.components";
import { getData } from "./utils/data.utils";

import "./App.css";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState(""); //[value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);

  // if initial values of monsters ever chasnges to some default values; hence setting default value to monsters
  const [filteredMonsters, setFilteredMonster] = useState(monsters);

  // we only want to fetch once the component is mounted; hence [] dependency array
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setMonsters(users);
    };
    fetchUsers();
  }, []);

  // sets the value of searchField to searched string
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
