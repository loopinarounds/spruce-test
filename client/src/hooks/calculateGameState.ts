import { useEffect } from "react";
import { Board, GameState, XorO } from "../types";

export function calculateGameState(
  board: Board,
  currentPlayer: XorO,
  setGameState: (state: GameState) => void
): void {
 
    const boardSize = board.length;

    for (let i = 0; i < boardSize; i++) {
     
      if (
        board[i].every((cell) => cell === currentPlayer)
      ) {
        setGameState(
          currentPlayer === "X" ? GameState.XWinner : GameState.OWinner
        );
        return;
      }

 
      if (
        board.every((row) => row[i] === currentPlayer)
      ) {
        setGameState(
          currentPlayer === "X" ? GameState.XWinner : GameState.OWinner
        );
        return;
      }
    }

  
    const mainDiagonal = board.every(
      (row, idx) => row[idx] === currentPlayer
    );
    const antiDiagonal = board.every(
      (row, idx) => row[boardSize - idx - 1] === currentPlayer
    );

    if (mainDiagonal || antiDiagonal) {
      setGameState(
        currentPlayer === "X" ? GameState.XWinner : GameState.OWinner
      );
      return;
    }


    const isDraw = board.every((row) =>
      row.every((cell) => cell !== undefined)
    );
    if (isDraw) {
      setGameState(GameState.Draw);
    }
  };
