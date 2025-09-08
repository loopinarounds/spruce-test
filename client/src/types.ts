export type XorO = "X" | "O";

export type Board = (XorO | undefined)[][];

export enum GameState {
    XWinner = "x_winner",
    OWinner = "o_winner",
    Draw = "draw",
    InProgress = "in_progress",
    }

    