import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchStagesAndInitializeThAndUserData } from './routing-network';
import { useEffect, useState } from 'react';
import StageRoute from './stage-route';
import LevelRoute from './level-route';

const Root = () => {
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

export default Root;

