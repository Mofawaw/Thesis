import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Level from '@/app/level/level';
import tutorialNodes from './data (todo-post: backend)/tutorials'; // TODO: into ThStore
import { fetchLevelAndSetActiveLevel, fetchStagesAndInitializeThAndUserData } from './data (todo-post: backend)/th-network';
import useThStore from './stores/th-store';
import Stage from './app/stage/stage';
import { useEffect, useState } from 'react';

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    fetchStagesAndInitializeThAndUserData().then(() => {
      setIsInitialLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StageRoute isInitialLoading={isInitialLoading} />} />
        <Route path="/level/:levelId" element={<LevelRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const StageRoute = ({ isInitialLoading }: { isInitialLoading: boolean }) => {
  const activeStage = useThStore(state => state.activeStage);
  const [showStage, setShowStage] = useState(false);

  useEffect(() => {
    if (!isInitialLoading) {
      setTimeout(() => setShowStage(true), 500);
    }
  }, [isInitialLoading]);

  return (
    <div className="relative w-screen h-screen bg-th-gradient-angular">
      {/* Loading */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isInitialLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Loading />
      </div>

      {/* Stage Component */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showStage && activeStage ? 'opacity-100' : 'opacity-0'}`}>
        {activeStage && <Stage stage={activeStage} />}
      </div>
    </div>
  );
}

const LevelRoute = () => {
  const { levelId } = useParams();
  const activeLevel = useThStore(state => state.activeLevel);
  const [isLoading, setIsLoading] = useState(true);
  const [showLevel, setShowLevel] = useState(false);

  useEffect(() => {
    if (levelId) {
      fetchLevelAndSetActiveLevel(levelId).then(() => {
        setIsLoading(false);
        setTimeout(() => setShowLevel(true), 500);
      });
    }
  }, [levelId]);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Loading Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <LoadingLevel />
      </div>

      {/* Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showLevel && activeLevel ? 'opacity-100' : 'opacity-0'}`}>
        {activeLevel && <Level key={levelId} level={activeLevel} tutorialNodes={tutorialNodes} />}
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-center bg-th-gradient-angular">
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