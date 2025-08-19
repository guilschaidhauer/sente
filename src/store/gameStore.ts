import { create } from 'zustand';
import type { Player } from '../core/types/player';
import type { Board } from '../core/board/createBoard';
import { createEmptyBoard } from '../core/board/createBoard';
import type { GamePhase } from '../core/types/gamePhase';

interface GameState {
  board: Board;
  currentPlayer: Exclude<Player, null>;
  gamePhase: GamePhase;
  placeToken: (x: number, y: number) => void;
  toggleWall: (x: number, y: number, side: 'top' | 'right' | 'bottom' | 'left') => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  board: createEmptyBoard(7),
  currentPlayer: 'blue',
  gamePhase: 'setup',

  placeToken: (x, y) =>
    set((state) => {
      if (state.gamePhase !== 'setup') return state;
      const cell = state.board[y][x];
      if (cell.token !== null) return state;

      // Count tokens for each player
      const countTokens = (player: 'blue' | 'red') =>
        state.board.flat().filter((c) => c.token === player).length;

      const blueTokens = countTokens('blue') + (state.currentPlayer === 'blue' ? 1 : 0);
      const redTokens = countTokens('red') + (state.currentPlayer === 'red' ? 1 : 0);

      // Place token
      const newBoard = state.board.map((row) => row.map((c) => ({ ...c })));
      newBoard[y][x].token = state.currentPlayer;

      // Check if both players have placed 4 tokens
      const nextBlueTokens = state.currentPlayer === 'blue' ? blueTokens : countTokens('blue');
      const nextRedTokens = state.currentPlayer === 'red' ? redTokens : countTokens('red');
      const setupDone = nextBlueTokens >= 4 && nextRedTokens >= 4;

      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'blue' ? 'red' : 'blue',
        gamePhase: setupDone ? 'play' : state.gamePhase,
      };
    }),

  toggleWall: (x, y, side) =>
    set((state) => {
      if (state.gamePhase !== 'play') return state;
      const newBoard = state.board.map((row) => row.map((c) => ({ ...c })));
      newBoard[y][x].walls[side] = !newBoard[y][x].walls[side];
      return { board: newBoard };
    }),
}));