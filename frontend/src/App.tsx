import ThStar from "./components/custom/ThStar.tsx";
import Level from "./components/level/Level.tsx"
import { ThLevel } from "./components/level/types/thTypes.ts";
import useTestingStore from "./testing-1/testingStore.ts";
import { tutorialNodes } from "./testing-1/tutorialNodes.ts";

function App() {
  const store = useTestingStore.getState()

  return (
    <>
      <Level level={store.currentLevel} tutorialNodes={store.currentLevel.stage.id === "s1" ? [tutorialNodes[0]] : tutorialNodes} />
    </>
  )
}

export default App