import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import Controls from "./components/Controls";
import { Howl } from "howler";
import "./index.css";

const victorySound = new Howl({ src: ["/sounds/victory.mp3"] });

function App() {
  const [gameState, setGameState] = useState("idle");
  const [sequence, setSequence] = useState([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(
    JSON.parse(localStorage.getItem("bestStreak")) || 0
  );
  const [ranking, setRanking] = useState(
    JSON.parse(localStorage.getItem("ranking")) || []
  );

  useEffect(() => {
    if (gameState === "running" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame(false);
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    const newSequence = generateSequence(5);
    setSequence(newSequence);
    setCurrentKeyIndex(0);
    setTimeLeft(30);
    setScore(0);
    setGameState("running");
  };

  const endGame = (won) => {
    setGameState("ended");
    if (won) {
      setStreak(streak + 1);
      victorySound.play();
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
        localStorage.setItem("bestStreak", JSON.stringify(streak + 1));
      }
    } else {
      const newRanking = [
        ...ranking,
        { streak, date: new Date().toLocaleString() },
      ];
      newRanking.sort((a, b) => b.streak - a.streak);
      setRanking(newRanking);
      localStorage.setItem("ranking", JSON.stringify(newRanking));
      setStreak(0);
    }
  };

  const resetGame = () => {
    setGameState("idle");
    setSequence([]);
    setCurrentKeyIndex(0);
    setTimeLeft(30);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="App bg-black text-gold min-h-screen flex flex-col items-center justify-center">
      <div className="mt-24 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-8">Mini-Game</h1>
        <Game
          gameState={gameState}
          sequence={sequence}
          currentKeyIndex={currentKeyIndex}
          timeLeft={timeLeft}
          endGame={endGame}
          setCurrentKeyIndex={setCurrentKeyIndex}
          setScore={setScore}
        />
        <Controls
          gameState={gameState}
          startGame={startGame}
          resetGame={resetGame}
        />
        <div className="ranking mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl">Sequência Atual: {streak}</h3>
          <h3 className="text-2xl">Melhor sequência: {bestStreak}</h3>
          <ul className="list-disc list-inside">
            {ranking.map((entry, index) => (
              <li key={index} className="text-xl">
                {index + 1}. Streak: {entry.streak} - {entry.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const generateSequence = (length) => {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length },
    () => keys[Math.floor(Math.random() * keys.length)]
  );
};

export default App;
