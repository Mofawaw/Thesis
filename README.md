# Thesis

Kai Zheng, BSc DINFK, ETH Zürich, Supervisor: Prof. Dr. Juraj Hromkovič

## Technologies Used
Frontend
- React
- Typescript
- TailwindCSS
- Zustand
- Other Libraries: (ReactFlow, JointJS, CodeMirror)

Backend
- Flask Python
- Docker

## Testing Guide
Frontend
- `cd frontend`
- `npm install`
- `npm run dev`

Backend
- `cd backend`
- `docker build -t backend-server .`
- `. venv/bin/activate`
- `python main.py`

## Testing-1
All levels are under the path `/level/${level.id}` where `level.id` is an element of `{"l-s1c1", "l-s1c2", ... "l-s3c2", "l-s3c3"}`. Here is a code snipped of `App.tsx`:
```
function App() {
  return (
    <Router>
      <InitializeRoutes />
      <Routes>
        {levels.map(level => (
          <Route
            key={level.id}
            path={`/level/${level.id}`}
            element={<Level key={level.id} ... />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
```

