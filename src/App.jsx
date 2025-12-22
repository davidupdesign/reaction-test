import { useState } from "react";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("waiting");
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleClick = () => {
    if (gameState === "waiting") {
      setGameState("ready");
      const randomDelay = Math.random() * 3500 + 1500;

      const id = setTimeout(() => {
        setGameState("green");
        setStartTime(Date.now()); // Record the time green appears
      }, randomDelay);
      setTimeoutId(id);
    } else if (gameState === "ready") {
      clearTimeout(timeoutId);
      setGameState("tooEarly");
    } else if (gameState === "green") {
      // Calculate reaction time
      const endTime = Date.now();
      const timeTaken = endTime - startTime - 50;
      setReactionTime(timeTaken);
      setGameState("result");
    } else if (gameState === "result" || gameState === "tooEarly") {
      // Reset the game
      setGameState("waiting");
      setReactionTime(null);
      setStartTime(null);
    }
  };

  const handleRetry = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to parent div
    setReactionTime(null);
    setStartTime(null);
    setGameState("ready");

    const randomDelay = Math.random() * 3500 + 1500;
    const id = setTimeout(() => {
      setGameState("green");
      setStartTime(Date.now());
    }, randomDelay);
    setTimeoutId(id);
  };

  return (
    <div className={`app ${gameState}`} onClick={handleClick}>
      {gameState === "waiting" && (
        <div>
          <h1>Click anywhere to start</h1>
          <p>Test your reaction time!</p>
        </div>
      )}

      {gameState === "ready" && <h1>Click when u see... <span className="green-text">🟩</span></h1>}

      {gameState === "green" && <h1>CLICK</h1>}

      {gameState === "result" && (
        <div>
          <h1>{reactionTime}ms</h1>
          <p>Click to try again</p>
        </div>
      )}

      {gameState === "tooEarly" &&
      <div>
        <h1>Too early buddy🥹</h1>
        <button onClick={handleRetry}>Retry</button>
        <p>Click Anywhere To Go Back</p>
      </div>
      }
    </div>
  );
}

export default App;
