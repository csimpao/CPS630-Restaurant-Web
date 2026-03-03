import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './views/Menu';
import Orders from './views/Orders';
import Receipt from './views/Receipt';

function App() {
  return (
    <>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </>
  );
}

export default App;
