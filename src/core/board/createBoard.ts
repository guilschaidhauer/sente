import type { Cell } from '../types/cell';

export type Board = Cell[][];

export function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => ({
      x,
      y,
      token: null,
      walls: { top: false, right: false, bottom: false, left: false },
    }))
  );
}
