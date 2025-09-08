import React from "react";
import Cell from "./Cell"; // Assuming Cell is a separate component
import { GameState, Board, XorO } from "../types";

export type GameBoardProps = {
  board: Board;
  updateBoard: React.Dispatch<React.SetStateAction<Board>>;
  currentPlayer: XorO;
  setCurrentPlayer: (value: XorO) => void;
  gameState: GameState;
  calculateGameState: () => void;
};

export function GameBoard({
  board,
  updateBoard,
  currentPlayer,
  setCurrentPlayer,
  gameState,
  calculateGameState,
}: GameBoardProps): JSX.Element {
  const onCellClick = (position: [number, number]): void => {
    const [i, j] = position;
    const cellVal = board[j][i];
    if (cellVal != undefined || gameState !== GameState.InProgress) return;

    updateBoard((prevBoard: Board) => {
      const newBoard: Board = prevBoard.map((row) => [...row]);
      newBoard[j][i] = currentPlayer;
      return newBoard;
    });

    calculateGameState();
  
    setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
  };

  return (
    <div
    className="
    grid gap-1
    bg-gray-900
    aspect-square
    [width:min(75vw,50vh)]
  "
    style={{
      gridTemplateColumns: `repeat(${board.length}, 1fr)`,
    }}
    >
      {board.flatMap((row, j) =>
        row.map((cell, i) => (
          <Cell
            key={`${i}-${j}`}
            value={cell}
            position={[i, j]}
            onCellClick={onCellClick}
            currentTurn={currentPlayer}
            gameState={gameState}
          />
        ))
      )}
    </div>
  );
};

export default Board;