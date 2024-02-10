import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Level from '@/app/level/level';
import tutorialNodes from './data (todo-post: backend)/tutorials'; // TODO: into ThStore
import { fetchLevelAndSetActiveLevel, fetchStagesAndInitializeThAndUserData } from './data (todo-post: backend)/th-network';
import useThStore from './stores/th-store';
import Stage from './app/stage/stage';
import { useEffect, useState } from 'react';
import { ThLevel } from './types/th-types';
import getRandomIntBetween from './helpers/random';

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
    let timeoutId: any;

    if (!isInitialLoading) {
      timeoutId = setTimeout(() => setShowStage(true), 500);
    }

    return () => clearTimeout(timeoutId);
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
  const [showLevel, setShowLevel] = useState(false);

  useEffect(() => {
    if (activeLevel) {
      setTimeout(() => setShowLevel(true), 300);
    }

    return () => setShowLevel(false);
  }, [activeLevel]);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Loading Level */}
      {!showLevel && <LoadingLevel key={levelId} activeLevel={activeLevel} levelId={levelId} />}

      {/* Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showLevel ? 'opacity-100' : 'opacity-0'}`}>
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

const LoadingLevel = ({ activeLevel, levelId }: { activeLevel?: ThLevel, levelId: string }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);

    let intervalId: any;
    let timeoutId: any;

    const totalDuration = getRandomIntBetween(100, 3000);
    const intervalDuration = 1000;
    const incrementPerInterval = 100 / (totalDuration / intervalDuration);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + getRandomIntBetween(incrementPerInterval * 0.5, incrementPerInterval * 1.5);;
          return newProgress < 100 ? newProgress : 100;
        });
      }, intervalDuration);

      fetchLevelAndSetActiveLevel(levelId).then(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 1000);
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [levelId]);

  const loadingText = progress < 100 ? (progress < 67 ? 'Level lädt...' : 'Fast fertig...') : 'Los gehts!';
  const barColor = progress < 100 ? 'bg-th-black-30' : (activeLevel ? `bg-${activeLevel.stage.color}-100` : 'bg-th-black-30');
  const bgColor = 'bg-th-black-10';

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 bg-th-background">
      <h3 className={`text-${activeLevel ? activeLevel.stage.color : "th-black"}-100 text-center`}>{loadingText}</h3>
      <div className="w-2/4">
        <div className={`h-8 rounded-th ${bgColor}`}>
          <div className={`h-8 rounded-th ${barColor} transition-all duration-100`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}