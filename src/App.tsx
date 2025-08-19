import { useGameStore } from './store/gameStore';

function App() {
  const { board, currentPlayer, placeStone } = useGameStore();

  return (
    <div>
      <h1>Sente</h1>
      <p>Current Player: {currentPlayer}</p>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(9, 40px)` }}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              onClick={() => placeStone(x, y)}
              style={{
                width: 40,
                height: 40,
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: cell === 'black' ? 'black' : cell === 'white' ? 'white' : 'transparent',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
