import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectPage from './components/pages/connect';
import ModellerPage from "./components/pages/modeller"
import ExplorerPage from './components/pages/explorer/explorer';
import DataManagementPage from "./components/pages/data"
import ProtectedRoute from './components/routes/protected-routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><ModellerPage /></ProtectedRoute>} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/modeller" element={<ProtectedRoute><ModellerPage /></ProtectedRoute>} />
        <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} />
        <Route path="/data" element={<ProtectedRoute><DataManagementPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
