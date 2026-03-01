import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './views/Menu';

function App() {
  return (
    <>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </>
  );
}

export default App;
