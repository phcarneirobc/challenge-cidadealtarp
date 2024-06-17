import React from 'react';

const Ranking = ({ ranking, bestStreak }) => {
  return (
    <div className="ranking mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Ranking</h2>
      <ul className="list-disc list-inside">
        {ranking.map((entry, index) => (
          <li key={index} className="text-xl">
            {index + 1}. Score: {entry.score} - {entry.date}
          </li>
        ))}
      </ul>
      <h3 className="text-2xl mt-4">Best Streak: {bestStreak}</h3>
    </div>
  );
};

export default Ranking;
