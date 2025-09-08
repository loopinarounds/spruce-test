import React from "react";
import Cell from "./Cell"; // Assuming Cell is a separate component
import { GameState, Board, XorO } from "../types";

export type GameBoardProps = {
  board: Board;
  onCellClick: (position: [number, number]) => void;
  currentPlayer: XorO;
  gameState: GameState;
};

export function GameBoard({
  board,
  onCellClick,
  currentPlayer,
  gameState,
}: GameBoardProps): JSX.Element {
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
}