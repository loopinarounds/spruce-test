import { useState } from "react";
import { Board, GameState, XorO } from "../types";
import { checkAntiDiagonalWin, checkDiagonalWin, checkDraw, checkHorizontalWin, checkVerticalWin } from "../../utils/checkWinners";

const getEmptyBoard = (size: number): Board =>
  Array(size)
    .fill(undefined)
    .map(() => Array(size).fill(undefined));

export function useGame() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [board, setBoard] = useState<Board>(getEmptyBoard(3)); 
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("O");
  const [gameState, setGameState] = useState<GameState>(GameState.InProgress);

  const resetGame = () => {
    setBoard(getEmptyBoard(boardSize));
    setGameState(GameState.InProgress);
    setCurrentPlayer("O");
  };

  const checkWinner = (updatedBoard: Board) => {
    if (
      checkHorizontalWin(updatedBoard, currentPlayer) ||
      checkVerticalWin(updatedBoard, currentPlayer) ||
      checkDiagonalWin(updatedBoard, currentPlayer) ||
      checkAntiDiagonalWin(updatedBoard, currentPlayer)
    ) {
      setGameState(currentPlayer === "X" ? GameState.XWinner : GameState.OWinner);
      return;
    }

   
    if (checkDraw(updatedBoard)) {
      setGameState(GameState.Draw);
    }
  };

  const onCellClick = (position: [number, number]) => {
    const [i, j] = position;
    if (board[j][i] !== undefined || gameState !== GameState.InProgress) {
      return;
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[j][i] = currentPlayer;
    

    setBoard(newBoard);

    setCurrentPlayer((prevPlayer) => (prevPlayer === "O" ? "X" : "O"));
    checkWinner(newBoard);
  };

  return {
    board,
    boardSize,
    setBoardSize,
    currentPlayer,
    gameState,
    resetGame,
    onCellClick,
    setBoard, // Exposed for testing purposes
  };
}