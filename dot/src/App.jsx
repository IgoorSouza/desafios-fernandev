import { useState } from "react";

function App() {
  const [dots, setDots] = useState([]);
  const [dotsToRedo, setDotsToRedo] = useState([]);

  const placeDot = (event) => {
    if (event.target.id != "undoButton" && event.target.id != "redoButton") {
      setDots((dots) => [...dots, { x: event.clientX, y: event.clientY }]);
      setDotsToRedo([]);
    }
  };

  const undo = () => {
    if (dots.length > 0) {
      const undoDot = dots.length - 1;
      setDotsToRedo([...dotsToRedo, dots.splice(undoDot, 1)]);
    }
  };

  const redo = () => {
    if (dotsToRedo.length > 0) {
      const redoDot = dotsToRedo.splice(dotsToRedo.length - 1, 1)[0][0];
      setDots((dots) => [...dots, redoDot]);
    }
  };

  return (
    <div>
      <div id="page" onClick={placeDot}>
        <div className="buttons">
          <button id="undoButton" onClick={undo}>
            Undo
          </button>

          <button id="redoButton" onClick={redo}>
            Redo
          </button>
        </div>

        {dots.map((dot, index) => (
          <div
            key={index}
            className="dot"
            style={{ top: dot.y, left: dot.x }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
