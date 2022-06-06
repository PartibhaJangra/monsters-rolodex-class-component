import Card from "../card/card.component.jsx";

import "./card-list.styles.css";
import "../card/card.component.jsx";

const CardList = ({ monsters }) => {
  return (
    <div className="card-list">
      {monsters.map((monster) => {
        return <Card monster={monster} key={monster.id} />;
      })}
    </div>
  );
};

export default CardList;
