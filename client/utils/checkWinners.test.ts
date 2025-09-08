import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkAntiDiagonalWin } from "./checkWinners";
import { Board } from "../src/types";

describe("checkWinners", () => {
  it("should detect a horizontal win", () => {
    const board: Board = [
      ["X", "X", "X"],
      ["O", "O", undefined],
      [undefined, undefined, "O"],
    ];
    expect(checkHorizontalWin(board, "X")).toBe(true);
    expect(checkHorizontalWin(board, "O")).toBe(false);
  });

  it("should detect a vertical win", () => {
    const board: Board = [
      ["X", "O", undefined],
      ["X", "O", undefined],
      ["X", undefined, "O"],
    ];
    expect(checkVerticalWin(board, "X")).toBe(true);
    expect(checkVerticalWin(board, "O")).toBe(false);
  });

  it("should detect a diagonal win", () => {
    const board: Board = [
      ["X", "O", undefined],
      ["O", "X", undefined],
      [undefined, undefined, "X"],
    ];
    expect(checkDiagonalWin(board, "X")).toBe(true);
    expect(checkDiagonalWin(board, "O")).toBe(false);
  });

  it("should detect an anti-diagonal win", () => {
    const board: Board = [
      ["X", "O", "O"],
      ["X", "O", undefined],
      ["O", undefined, "X"],
    ];
    expect(checkAntiDiagonalWin(board, "O")).toBe(true);
    expect(checkAntiDiagonalWin(board, "X")).toBe(false);
  });
});