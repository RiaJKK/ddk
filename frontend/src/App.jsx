import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;