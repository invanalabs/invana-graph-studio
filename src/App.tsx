// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectPage } from './components/pages/connect';
import ExplorerPage from './components/pages/explorer';
 ;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectPage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
