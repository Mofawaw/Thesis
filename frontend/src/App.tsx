import Level from "./components/level/Level.tsx"
import { levels } from "./components/level/levelData.ts";
import ThLevel from "./components/level/types/ThLevel.ts";

function App() {
  const level: ThLevel = levels[2]; // TODO

  return (
    <>
      <Level level={level} />
    </>
  )
}

export default App