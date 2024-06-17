import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Swal from 'sweetalert2';
import './Game.css';

const Game = ({ gameState, sequence, currentKeyIndex, timeLeft, endGame, setCurrentKeyIndex, setScore }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'running') {
        if (e.key.toUpperCase() === sequence[currentKeyIndex]) {
          if (currentKeyIndex === sequence.length - 1) {
            setScore(prevScore => prevScore + 1);
            setCurrentKeyIndex(0);
            showNotification('Acertou!', 'success');
            setTimeout(() => {
              endGame(true);
            }, 1000);
          } else {
            setCurrentKeyIndex(currentKeyIndex + 1);
          }
        } else {
          showNotification('Errou!', 'error');
          setTimeout(() => {
            endGame(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, sequence, currentKeyIndex, endGame, setCurrentKeyIndex, setScore]);

  const showNotification = (message, type) => {
    Swal.fire({
      title: message,
      icon: type,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: 'top-end',
      background: type === 'success' ? '#4caf50' : '#f44336',
      color: 'white'
    });
  };

  return (
    <div className="game flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="sequence flex space-x-4">
        {sequence.map((key, index) => (
          <span key={index} className={`key ${index === currentKeyIndex ? 'active' : ''}`}>
            {key}
          </span>
        ))}
      </div>
      <div className="time text-2xl mt-4">Time left: {timeLeft}s</div>
      <ProgressBar timeLeft={timeLeft} totalTime={30} />
    </div>
  );
};

export default Game;
