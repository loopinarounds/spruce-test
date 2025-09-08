import React from 'react';
import { GameState, XorO } from '../types';



export type CellProps = {
    gameState: GameState;
    value : XorO | undefined;
    position: [number, number];
    onCellClick : (position: [number, number]) => void;
    currentTurn: XorO;
}

export function Cell({
    value,
    position,
    onCellClick,
    currentTurn,
    gameState
}: CellProps): JSX.Element {
  return (
    <div
      className="group aspect-square grow text-xl
        cursor-pointer flex items-center justify-center font-bold select-none  [container-type:inline-size] bg-white"
      onClick={() => onCellClick(position)}
    >
      <div className="w-full flex items-center justify-center">
          <span className={`text-[70cqw] ${!value && gameState === GameState.InProgress && 'opacity-0 group-hover:opacity-30 transition-opacity duration-200'}`}>{value ?? currentTurn}</span>
      </div>
    </div>
  );
};

export default Cell;