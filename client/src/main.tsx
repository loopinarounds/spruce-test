
import React, {  useState } from "react";
import {GameBoard} from "./components/GameBoard";


import { Setup } from "./components/Setup";
import { Board, GameState, XorO } from "./types";

export const Main = () => {
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("O");
  const [board, setBoard] = useState<Board>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [gameState, setGameState] = useState<GameState>(
    GameState.InProgress
  );
  const [boardSize, setBoardSize] = useState<number>(3);



  

  const resetGame = (): void => {
    setBoard(
      Array(boardSize)
        .fill(undefined)
        .map(() => Array(boardSize).fill(undefined))
    );
    setGameState(GameState.InProgress);
  };

  return (
    <>
      <div className="flex flex-col mt-10 items-center gap-10">
        <h1
          className="
            text-4xl sm:text-5xl font-bold tracking-wide
            text-slate-800 dark:text-slate-200
          "
        >
          Tic Tac Toe
        </h1>

        <div className="font-bold text-l">Current Player: {currentPlayer}</div>
        
        <GameBoard
          board={board}
          updateBoard={setBoard}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          gameState={gameState}
        />
        <Setup
          boardSize={boardSize}
          setBoardSize={setBoardSize}
          resetGame={resetGame}
        />
      </div>
      
    </>
  );
};