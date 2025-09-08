import { Board, XorO } from "../src/types"


export const checkHorizontalWin = (board: Board, player: XorO): boolean => {
  return board.some((row) => row.every((cell) => cell === player));
};


export const checkVerticalWin = (board: Board, player: XorO): boolean => {
  const boardSize = board.length;
  for (let col = 0; col < boardSize; col++) {
    if (board.every((row) => row[col] === player)) {
      return true;
    }
  }
  return false;
};


export const checkDiagonalWin = (board: Board, player: XorO): boolean => {
  const boardSize = board.length;
  return board.every((row, i) => row[i] === player);
};


export const checkAntiDiagonalWin = (board: Board, player: XorO): boolean => {
  const boardSize = board.length;
  return board.every((row, i) => row[boardSize - i - 1] === player);
};

export const checkDraw = (board: Board): boolean => {   
    return board.every((row) => row.every((cell) => cell !== undefined));
}
