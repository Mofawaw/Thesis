import Level from "./components/level/Level.tsx"
import { levels } from "./components/level/levelData.ts";
import { ThLevel } from "./components/level/types/thTypes.ts";

function App() {
  const level: ThLevel = levels[1]; // TODO

  return (
    <>
      <Level level={level} />
    </>
  )
}

export default App