import { useState } from "react";
import { Board, GameState, XorO } from "../types";

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
    setCurrentPlayer("O");
    setGameState(GameState.InProgress);
  };

  const checkWinner = (updatedBoard: Board) => {
    const boardSize = updatedBoard.length;

    console.log("Checking winner for board:" ,updatedBoard);
  
    for (let i = 0; i < boardSize; i++) {
      if (updatedBoard[i].every((cell) => cell === currentPlayer)) {
      
        setGameState(currentPlayer === "X" ? GameState.XWinner : GameState.OWinner);
        return;
      }
    }
  
    for (let i = 0; i < boardSize; i++) {
      if (updatedBoard.every((row) => row[i] === currentPlayer)) {
        setGameState(currentPlayer === "X" ? GameState.XWinner : GameState.OWinner);
        return;
      }
    }
  
    if (updatedBoard.every((row, idx) => row[idx] === currentPlayer)) {
      setGameState(currentPlayer === "X" ? GameState.XWinner : GameState.OWinner);
      return;
    }
  
    if (updatedBoard.every((row, idx) => row[boardSize - idx - 1] === currentPlayer)) {
      setGameState(currentPlayer === "X" ? GameState.XWinner : GameState.OWinner);
      return;
    }
  
    // Check for a draw
    const isDraw = updatedBoard.every((row) => row.every((cell) => cell !== undefined));
    if (isDraw) {
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
  };
}