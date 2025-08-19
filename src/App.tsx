import { useGameStore } from './store/gameStore';
import BoardSVG from "./BoardSVG";

function App() {
  const phase = useGameStore(state => state.gamePhase);

  return (
    <>
      <p>Phase: {phase}</p>
      <BoardSVG />
    </>
  );
}

export default App;