import { useState, useEffect } from "react";
import Card from "./Card";
import "./GameBoard.css";

function GameBoard() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    const newImages = files
      .filter((file) => validImageTypes.includes(file.type))
      .map((file) => URL.createObjectURL(file));

    const updatedImages = [...uploadedImages, ...newImages].slice(0, 4);
    setUploadedImages(updatedImages);

    if (updatedImages.length >= 4) {
      const newCards = updatedImages.flatMap((image, index) => [
        { id: index * 2 + 1, value: image, matched: false },
        { id: index * 2 + 2, value: image, matched: false },
      ]);
      setCards(shuffleCards(newCards));
    }
  };

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
    setFlippedCards([]);
    setMoves(0);

    if (uploadedImages.length >= 4) {
      const newCards = uploadedImages.flatMap((image, index) => [
        { id: index * 2 + 1, value: image, matched: false },
        { id: index * 2 + 2, value: image, matched: false },
      ]);
      setCards(shuffleCards(newCards));
    }
  };

  return (
    <div className="game-board">
      <h2>Movimentos: {moves}</h2>
      <div className="upload-section">
        <label htmlFor="image-upload">Carregar Imagens (PNG/JPG):</label>
        <input
          id="image-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          onChange={handleImageUpload}
        />
        <p>Carregue até 4 imagens para criar o baralho.</p>
      </div>
      {cards.length === 0 && (
        <p>Por favor, carregue pelo menos 4 imagens para começar o jogo.</p>
      )}
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
      {cards.length > 0 && <button onClick={resetGame}>Resetar Jogo</button>}
    </div>
  );
}

export default GameBoard;
