import { create } from 'zustand';

interface GameState {
  board: string[][];
  currentPlayer: 'black' | 'white';
  placeStone: (x: number, y: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  board: Array.from({ length: 9 }, () => Array(9).fill('')),
  currentPlayer: 'black',
  placeStone: (x, y) =>
    set((state) => {
      if (state.board[y][x] !== '') return state; // spot taken
      const newBoard = state.board.map((row) => [...row]);
      newBoard[y][x] = state.currentPlayer;
      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'black' ? 'white' : 'black',
      };
    }),
}));
