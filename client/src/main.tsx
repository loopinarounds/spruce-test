import React from "react";
import { useGame } from "./hooks/useGame";
import { GameBoard } from "./components/GameBoard";
import { SetupGame } from "./components/Setup";

export const Main = () => {

  const {
    board,
    currentPlayer,
    gameState,
    boardSize,
    setBoardSize,
    resetGame,
    onCellClick,
  } = useGame();

  return (
    <div className="flex flex-col mt-5 gap-8 items-center">
          <div className='font-bold text-2xl'>Tic Tac Toe</div>


      <div className="font-bold text-l">{currentPlayer}'s turn</div>

      <GameBoard
        board={board}
        onCellClick={onCellClick}
        currentPlayer={currentPlayer}
        gameState={gameState}
      />
      <SetupGame
        boardSize={boardSize}
        setBoardSize={setBoardSize}
        resetGame={resetGame()}
      />
    </div>
  );
};