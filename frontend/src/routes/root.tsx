import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useUserStore from '@/stores/user-store';

import { fetchAndConfigureStage } from './routing-network';
import StageRoute from './stage-route';
import LevelRoute from './level-route';
import TutorialRoute from './tutorial-route';
import BlankRoute from './blank-route';

const Root = () => {
  const userStore = useUserStore.getState();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 767);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 767);
    };

    window.addEventListener('resize', handleResize);

    userStore.initializeUserProgress();
    fetchAndConfigureStage().then(() => {
      setIsInitialLoading(false);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isLargeScreen) {
    return <DisplayTooSmall />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StageRoute isInitialLoading={isInitialLoading} />} />
        <Route path="/level/:levelId" element={<LevelRoute />} />
        <Route path="/level/tutorial" element={<TutorialRoute />} />
        <Route path="/level/blank" element={<BlankRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;

const DisplayTooSmall = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-center bg-th-gradient-angular">
      <h4>Dein Display ist zu klein, bitte verwende ein iPad/Computer.</h4>
    </div>
  )
}