import React from 'react';

const Controls = ({ gameState, startGame, resetGame }) => {
  return (
    <div className="controls mt-8 flex space-x-4">
      {gameState === 'idle' && <button className="btn btn-start" onClick={startGame}>Start Game</button>}
      {gameState === 'running' && <button className="btn btn-end" onClick={resetGame}>Reset Game</button>}
      {gameState === 'ended' && <button className="btn btn-restart" onClick={startGame}>Restart Game</button>}
    </div>
  );
};

export default Controls;
