import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import LiveFeedPage from './pages/LiveFeedPage';
import ContradictionsPage from './pages/ContradictionsPage';

function App() {
  return (
    <Routes>
      {/* Routes for the public layout (no sidebar) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Routes for the dashboard layout (with sidebar) */}
      <Route element={<DashboardLayout />}>
        <Route path="/live-feed" element={<LiveFeedPage />} />
        <Route path="/contradictions" element={<ContradictionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;