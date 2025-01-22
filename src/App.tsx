import PinyinGame from './components/PinyinGame'
import PinyinListPage from './pages/PinyinListPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PinyinGame />} />
        <Route path="/pinyin-list" element={<PinyinListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
