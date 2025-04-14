import "./Card.css";

function Card({ id, value, isFlipped, onFlip }) {
  const handleClick = () => {
    if (!isFlipped) {
      onFlip(id);
    }
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">
          <img src={value} alt="card" className="card-image" />
        </div>
      </div>
    </div>
  );
}

export default Card;
