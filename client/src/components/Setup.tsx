import React from "react";

export type SetupGameProps = {
    boardSize: number;
    setBoardSize: (size: number) => void;
    resetGame: () => void;
  };
  

export function SetupGame({
    boardSize,
    setBoardSize,
    resetGame,
  }: SetupGameProps): JSX.Element {
    const handleClick = () => {
      resetGame();
    };
  
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800">Setup Game</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="board-size" className="mb-2 text-sm font-medium text-gray-700">
            Board Size
          </label>
          <input
            onChange={(e) => setBoardSize(Number(e.target.value))}
            type="number"
            min={3}
            max={15}
            value={boardSize}
            className="
              border border-gray-300 rounded-md px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500
              invalid:border-red-500 invalid:ring-red-300
              transition
            "
          />
          <p className="mt-1 text-xs text-red-600">
            {(boardSize < 3 || boardSize > 15) && "Enter a number between 3 and 15."}
          </p>
        </div>
        <button
          onClick={handleClick}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
        >
          Reset Game
        </button>
      </div>
    );
  }