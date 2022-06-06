import { Component } from "react";
import logo from "./logo.svg";
import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.components.jsx";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return {
              monsters: users,
            };
          }
          // () => console.log(this.state)
        )
      );
  }

  // called when monster is searched in text box
  onSearchChange = (event) => {
    // value getting from the UI
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        return { searchField }; // updateing state of searchField
      }
      // () => console.log(this.state)
    );
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // keeping it outside onChange(); so that it's globally available
    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          className="monsters-search-box"
          placeholder="Input monsters"
        />
        <CardList monsters={filteredMonster} />
      </div>
    );
  }
}

export default App;
