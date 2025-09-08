import React, { useEffect, useState } from "react";
import { privateApiRequest } from "../api";
import { GameState, LeaderboardEntry } from "../types";
import Loading from "./Loading";

export function Leaderboard({gameState}:{gameState: GameState}): JSX.Element {

  const [loading, setLoading] = useState(true);
const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);





useEffect(() => {
  const getLeaderboardData = async () => {
    if(gameState !== GameState.InProgress) return;
    setLoading(true);

    const response = await privateApiRequest<LeaderboardEntry[]>(`/leaderboard`);


    if(response.length === 0) {
      setLeaderboardData([]);
      setLoading(false);
      return;
    }

    setLeaderboardData(response)
    setLoading(false);
  };

  getLeaderboardData();
}, [gameState]);




if (loading) {
  return <Loading />;
}

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      {leaderboardData.length === 0 && (
        <p className="text-gray-600">No games played yet.</p>
      )}
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{entry.name}</span>
            <span>{entry.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

