import { create } from 'zustand';
import type { Player } from '../core/types/player';
import type { Board } from '../core/board/createBoard';
import { createEmptyBoard } from '../core/board/createBoard';

interface GameState {
  board: Board;
  currentPlayer: Exclude<Player, null>; // only 'blue' | 'red'
  placeToken: (x: number, y: number) => void;
  toggleWall: (x: number, y: number, side: 'top' | 'right' | 'bottom' | 'left') => void;
}

export const useGameStore = create<GameState>((set) => ({
  board: createEmptyBoard(7),
  currentPlayer: 'blue',

  placeToken: (x, y) =>
    set((state) => {
      const cell = state.board[y][x];
      if (cell.token !== null) return state; // already occupied

      const newBoard = state.board.map((row) => row.map((c) => ({ ...c })));
      newBoard[y][x].token = state.currentPlayer;

      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'blue' ? 'red' : 'blue',
      };
    }),

  toggleWall: (x, y, side) =>
    set((state) => {
      const newBoard = state.board.map((row) => row.map((c) => ({ ...c })));
      newBoard[y][x].walls[side] = !newBoard[y][x].walls[side];
      return { board: newBoard };
    }),
}));
