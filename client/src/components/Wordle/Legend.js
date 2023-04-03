import './Letter.css';
import './Legend.css';

function Legend() {
  return (
    <div className="legend">
      <div className="legend-content">
        <span className="legend-item">
          <div className="letter-box mini right"></div>: Correct
        </span>
        <span className="legend-item">
          <div className="letter-box mini half-right"></div>: Right Guess, Wrong Position
        </span>
        <span className="legend-item">
          <div className="letter-box mini wrong"></div>: Wrong
        </span>
      </div>
    </div>
  );
}

export default Legend;