import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Level from "./app/level/level.tsx";
import { levels, initializeNavigation } from "./testing-1/testing-store.ts";
import { tutorialNodes } from "./testing-1/tutorials.ts";

const InitializeRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    initializeNavigation(navigate);
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <InitializeRoutes />
      <Routes>
        {levels.map(level => (
          <Route
            key={level.id}
            path={`/level/${level.id}`}
            element={
              <Level
                key={level.id}
                level={level}
                tutorialNodes={level.stage.id === "s1" ? [tutorialNodes[0]] : tutorialNodes}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;