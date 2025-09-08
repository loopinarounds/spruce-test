import { useState} from "react";
import { Board, GameState, XorO } from "../types";

export function useGame() {
  
  const [boardSize, setBoardSize] = useState<number>(3);
  const [board, setBoard] = useState<Board>(
    getEmptyBoard(3)
  );
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("O");
  const [gameState, setGameState] = useState<GameState>(GameState.InProgress);

  


  const resetGame = (boardSize: number) => {
    setBoard(getEmptyBoard(boardSize));
    setCurrentPlayer("O");
    setGameState(GameState.InProgress);
  }

  const checkWinner = () => {

    for (let i = 0; i < board.length; i++) {

      if (board[i].every((cell) => cell === currentPlayer)) {
        setGameState(
          currentPlayer === "X" ? GameState.XWinner : GameState.OWinner
        );
        return;
      }


      if (board.every((row) => row[i] === currentPlayer)) {
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

  if (gameState === GameState.InProgress) {
    checkWinner();
  }


  const onCellClick = (position: [number, number]): void => {
    const [i, j] = position;
    const cellVal = board[j][i];
    if (cellVal || gameState !== GameState.InProgress) return;

    setBoard((prevBoard: Board) => {
      const newBoard: Board = prevBoard.map((row) => [...row]);
      newBoard[j][i] = currentPlayer;
      return newBoard;
    });

  
    checkWinner();

    if(gameState === GameState.InProgress ) {
    setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
    }
  };



    

  return {
    board,
    currentPlayer,
    gameState,
    boardSize,
    setBoardSize,
    resetGame,
    onCellClick,
  };
}

const getEmptyBoard = (size: number): Board => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined)
  );
}