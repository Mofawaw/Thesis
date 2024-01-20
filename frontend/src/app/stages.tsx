import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import stages from '@/testing-1/stages.ts';
import Stage from './stage/stage.tsx';

function Stages() {
  return (
    <Router>
      <Routes>
        {stages.map(stage => (
          <Route
            key={stage.id}
            path={`/stage/${stage.id}`}
            element={<Stage />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default Stages;