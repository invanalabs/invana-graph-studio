import "@invana/ui/index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import HomePage from "./pages/home/home";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute><Navigate to={"/explorer"} /></ProtectedRoute>} /> */}
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/connect" element={<ConnectPage />} />
        <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} />
        <Route path="/modeller" element={<ProtectedRoute><ModellerPage /></ProtectedRoute>} /> */}
        {/* <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} /> */}
        {/* <Route path="/data" element={<ProtectedRoute><DataManagementPage /></ProtectedRoute>} /> */}

        {/* Other routes */}
        <Route path="*" element={<NotFoundPage />} />  {/* Catch-all route for 404 */}

      </Routes>
    </Router>
  );
};

export default App;

