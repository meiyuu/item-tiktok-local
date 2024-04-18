import { Routes, Route } from 'react-router-dom';
import Counter from 'pages/counter';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Counter />} />
      </Routes>
    </div>
  );
}

export default App;