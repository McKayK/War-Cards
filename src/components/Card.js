import React from "react";
import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <h1>{card.suit}</h1>
      <h1>{card.value}</h1>
    </div>
  );
};

export default Card;
