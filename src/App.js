import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Deck from "./deck/deck-of-cards/deck";

function App() {
  const [playedCards, setPlayedCards] = useState([]);
  const [player, setPlayer] = useState({});
  const [bot, setBot] = useState({});
  const [tieCards, setTieCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [botTotal, setBotTotal] = useState(0);

  useEffect(() => {
    const deck = new Deck();
    deck.shuffle();
    const dealCards = 26;

    const player = new Deck(deck.dealCards(dealCards));
    const bot = new Deck(deck.dealCards(dealCards));
    setPlayer(player);
    setBot(bot);
  }, []);

  const handClick = () => {
    const playerCard = player.playCard();
    const botCard = bot.playCard();

    setTieCards((preState) => {
      return [...preState, playerCard, botCard];
    });

    const comparison = compare(playerCard, botCard);

    if (comparison === "player") {
      player.addToHandy(tieCards);
      setTieCards([]);
      setPlayerTotal(player.cards.length);
      setBotTotal(bot.cards.length);
    } else if (comparison === "bot") {
      bot.addToHandy(tieCards);
      setTieCards([]);
      setBotTotal(bot.cards.length);
      setPlayerTotal(player.cards.length);
    } else {
      setPlayerTotal(player.cards.length);
      setBotTotal(bot.cards.length);
    }

    console.log(player.cards);
    console.log(player.cards.length, bot.cards.length);
    setPlayedCards([playerCard, botCard]);
  };

  const compare = (playerCard, botCard) => {
    const values = {
      "A": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      "J": 11,
      "Q": 12,
      "K": 13,
    };

    if (values[playerCard.value] > values[botCard.value]) {
      return "player";
    } else if (values[botCard.value] > values[playerCard.value]) {
      return "bot";
    } else {
      return "tie";
    }
  };

  return (
    <div className="App">
      <div>player: {playerTotal}</div>
      <button onClick={handClick}>Play Card</button>
      {playedCards.map((elem, index) => {
        return <Card key={index} card={elem} />;
      })}
    </div>
  );
}

export default App;
