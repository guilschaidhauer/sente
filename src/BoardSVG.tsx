import { useGameStore } from './store/gameStore';

const CELL_SIZE = 40;
const WALL_THICKNESS = 6; // bigger so it's easier to click

function BoardSVG() {
  const { board, placeToken, toggleWall } = useGameStore();

  return (
    <svg
      width={board.length * CELL_SIZE}
      height={board.length * CELL_SIZE}
      style={{ border: '2px solid black' }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => {
          const cx = x * CELL_SIZE;
          const cy = y * CELL_SIZE;

          return (
            <g key={`${x}-${y}`}>
              {/* Cell background */}
              <rect
                x={cx}
                y={cy}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill="white"
                stroke="black"
                onClick={() => placeToken(x, y)}
              />

              {/* Token */}
              {cell.token && (
                <circle
                  cx={cx + CELL_SIZE / 2}
                  cy={cy + CELL_SIZE / 2}
                  r={CELL_SIZE / 3}
                  fill={cell.token === 'blue' ? 'blue' : 'red'}
                />
              )}

              {/* --- Walls (always render, just change color) --- */}

              {/* Top wall */}
              <rect
                x={cx}
                y={cy - WALL_THICKNESS / 2}
                width={CELL_SIZE}
                height={WALL_THICKNESS}
                fill={cell.walls.top ? 'blue' : 'transparent'}
                stroke="transparent"
                onClick={() => toggleWall(x, y, 'top')}
              />

              {/* Right wall */}
              <rect
                x={cx + CELL_SIZE - WALL_THICKNESS / 2}
                y={cy}
                width={WALL_THICKNESS}
                height={CELL_SIZE}
                fill={cell.walls.right ? 'blue' : 'transparent'}
                stroke="transparent"
                onClick={() => toggleWall(x, y, 'right')}
              />

              {/* Bottom wall */}
              <rect
                x={cx}
                y={cy + CELL_SIZE - WALL_THICKNESS / 2}
                width={CELL_SIZE}
                height={WALL_THICKNESS}
                fill={cell.walls.bottom ? 'blue' : 'transparent'}
                stroke="transparent"
                onClick={() => toggleWall(x, y, 'bottom')}
              />

              {/* Left wall */}
              <rect
                x={cx - WALL_THICKNESS / 2}
                y={cy}
                width={WALL_THICKNESS}
                height={CELL_SIZE}
                fill={cell.walls.left ? 'blue' : 'transparent'}
                stroke="transparent"
                onClick={() => toggleWall(x, y, 'left')}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}

export default BoardSVG;
