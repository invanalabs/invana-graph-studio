import "@invana/ui/index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import ConnectPage from "./pages/connect/connect";
import ProtectedRoute from "./routes/protected-route";
import ModellerPage from "./pages/modeller/modeller";


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<ProtectedRoute><Navigate to={"/modeller"} /></ProtectedRoute>} />
        {/* <Route path="/" element={<ProtectedRoute><Navigate to={"/explorer"} /></ProtectedRoute>} /> */}
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/modeller" element={<ProtectedRoute><ModellerPage /></ProtectedRoute>} />


        {/* Other routes */}
        <Route path="*" element={<NotFoundPage />} />  {/* Catch-all route for 404 */}

      </Routes>
    </Router>
  );
};

export default App;

