import "./Card.css";

const Card = ({ id, value, isFlipped, onFlip }) => {
  const handleClick = () => {
    if (!isFlipped) {
      onFlip(id);
    }
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{value}</div>
      </div>
    </div>
  );
};

export default Card;
