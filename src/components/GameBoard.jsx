import { useState, useEffect } from "react";
import Card from "./Card";
import "./GameBoard.css";

function GameBoard() {
  const initialCards = [
    { id: 1, value: "src/assets/images/card1.png", matched: false },
    { id: 2, value: "src/assets/images/card1.png", matched: false },
    { id: 3, value: "src/assets/images/card2.png", matched: false },
    { id: 4, value: "src/assets/images/card2.png", matched: false },
    { id: 5, value: "src/assets/images/card3.png", matched: false },
    { id: 6, value: "src/assets/images/card3.png", matched: false },
    { id: 7, value: "src/assets/images/card4.png", matched: false },
    { id: 8, value: "src/assets/images/card4.png", matched: false },
  ];

  const [cards, setCards] = useState(shuffleCards([...initialCards]));
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleFlip = (id) => {
    if (
      flippedCards.length < 2 &&
      !cards.find((card) => card.id === id).matched
    ) {
      setFlippedCards([...flippedCards, id]);
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.value === secondCard.value) {
        setCards(
          cards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, cards]);

  const resetGame = () => {
    setCards(shuffleCards([...initialCards]));
    setFlippedCards([]);
    setMoves(0);
  };

  return (
    <div className="game-board">
      <h2>Movimentos: {moves}</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            value={card.value}
            isFlipped={flippedCards.includes(card.id) || card.matched}
            onFlip={handleFlip}
          />
        ))}
      </div>
      <button onClick={resetGame}>Resetar Jogo</button>
    </div>
  );
}

export default GameBoard;
