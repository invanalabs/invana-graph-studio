import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConnectPage from './components/pages/connect';
import ModellerPage from "./components/pages/modeller/modeller"
import ExplorerPage from './components/pages/explorer/explorer';
import DataManagementPage from "./components/pages/data"
import ProtectedRoute from './components/routes/protected-routes';
import NotFoundPage from './components/pages/not-found';
import "./icons/fontawesome"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Navigate to={"/explorer"} /></ProtectedRoute>} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/modeller" element={<ProtectedRoute><ModellerPage /></ProtectedRoute>} />
        <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} />
        <Route path="/data" element={<ProtectedRoute><DataManagementPage /></ProtectedRoute>} />

        {/* Other routes */}
        <Route path="*" element={<NotFoundPage />} />  {/* Catch-all route for 404 */}
     
      </Routes>
    </Router>
  );
};

export default App;
