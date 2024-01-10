import Level from "./components/level/Level.tsx"
import { levels, tutorialNodes } from "./components/level/levelData.ts";
import { ThLevel } from "./components/level/types/thTypes.ts";

function App() {
  const level: ThLevel = levels[2]; // TODO

  return (
    <>
      <Level level={level} tutorialNodes={level.stage.id === "s1" ? [tutorialNodes[0]] : tutorialNodes} />
    </>
  )
}

export default App