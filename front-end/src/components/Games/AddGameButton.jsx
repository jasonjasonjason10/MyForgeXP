import "./AddGameButton.css";

export default function AddGameButton({ onClick }) {
  return (
    <button className="add-game-btn" onClick={onClick}>
      <span className="plus-text">+</span>
      <span className="label">Add Game</span>
    </button>
  );
}
