import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Level from '@/app/level/level';
import tutorialNodes from './data (todo-post: backend)/tutorials'; // TODO: into ThStore
import { fetchLevel, fetchStages } from './data (todo-post: backend)/th-network';
import useThStore from './stores/th-store';
import Stage from './app/stage/stage';
import { useEffect } from 'react';

const App = () => {
  fetchStages();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StageRoute />} />
        <Route path="/level/:levelId" element={<LevelRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const StageRoute = () => {
  const activeStage = useThStore(state => state.activeStage);

  return (
    <div>
      {activeStage && <Stage stage={activeStage} />}
      {!activeStage && <Loading />}
    </div>
  );
}

const LevelRoute = () => {
  const { levelId } = useParams();
  const activeLevel = useThStore(state => state.activeLevel);

  useEffect(() => {
    if (levelId) {
      fetchLevel(levelId);
    }
  }, [levelId]);

  return (
    <div>
      {activeLevel && <Level level={activeLevel} tutorialNodes={tutorialNodes} />}
      {!activeLevel && <LoadingLevel />}
    </div>
  );
}

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-center bg-th-background">
      <h1><span className="text-th-value-100">Werte</span><span className="text-th-together-100"> &</span><br /><span className="text-th-reference-100">Referenzen</span></h1>
    </div>
  )
}

const LoadingLevel = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-center bg-th-background">

    </div>
  )
}