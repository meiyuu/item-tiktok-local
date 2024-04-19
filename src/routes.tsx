import { Routes, Route } from 'react-router-dom';
import Counter from 'pages/counter';

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </div>
  );
}

export default Routers;