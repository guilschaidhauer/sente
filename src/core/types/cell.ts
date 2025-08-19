import type { Player } from './player';

export interface Cell {
  x: number;
  y: number;
  token: Player;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}
