import React from "react";
import { useGame } from "./hooks/useGame";
import { GameBoard } from "./components/GameBoard";
import { SetupGame } from "./components/Setup";
import { WinnerModal } from "./components/WinnerModal";
import { GameState } from "./types";

export const Main = () => {



  const {
    board,
    boardSize,
    setBoardSize,
    currentPlayer,
    gameState,
    resetGame,
    onCellClick,
  } = useGame();

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
        Tic Tac Toe
      </h1>

      <div className="font-bold text-l">Current Player: {currentPlayer}</div>

      <GameBoard
        board={board}
        onCellClick={onCellClick}
        currentPlayer={currentPlayer}
        gameState={gameState}
      />
      <SetupGame
        boardSize={boardSize}
        setBoardSize={setBoardSize}
        resetGame={resetGame}
      />
     { gameState != GameState.InProgress && (
       <WinnerModal
        onClose={() => resetGame()}
        gameState={gameState}
      />
      )}
    </div>
  );
};