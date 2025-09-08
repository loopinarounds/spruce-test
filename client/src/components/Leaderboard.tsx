import React from "react";

export function Leaderboard() {
  const leaderboardData = [
    { name: "Alice", score: 120 },
    { name: "Bob", score: 95 },
    { name: "Charlie", score: 110 },
    { name: "Diana", score: 85 },
    { name: "Eve", score: 100 },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

