import React, { useState } from "react";
import { GameState } from "../types";
import { privateApiRequest } from "../api";

type WinnerModalProps = {
  gameState: GameState
  onClose: () => void;
};

export function WinnerModal({
  gameState,
  onClose,
}: WinnerModalProps): JSX.Element{
  const [playerName, setPlayerName] = useState(""); 


  const saveGame = ()=> privateApiRequest<void>(`/create-game`, {
    method: "POST",
    body: {
      name_of_winner: playerName
    }
  });
  
  const handleSave = async () => {
    await saveGame()
    onClose();
  };




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        {gameState != GameState.Draw ? (
          <>
            <h2 className="text-xl font-bold mb-4">We have a winner!</h2>
            <p className="mb-4">Congratulations to Player {gameState === GameState.OWinner ? "O" : "X"}!</p>
            <label
              htmlFor="player-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter the winner's name:
            </label>
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">It's a draw!</h2>
            <p className="mb-4">No one wins this time. Try again!</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reset Game
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};