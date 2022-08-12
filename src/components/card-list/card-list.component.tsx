import { Monster } from "../../App.js";

import Card from "../card/card.component";

import "./card-list.styles.css";
import "../card/card.component";

type CardListProps = {
  monsters: Monster[]; // monsters is an array of Monster
};

const CardList = ({ monsters }: CardListProps) => (
  <div className="card-list">
    {monsters.map((monster) => {
      return <Card key={monster.id} monster={monster} />;
    })}
  </div>
);

export default CardList;
