import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DrawingPage from './pages/DrawingPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/room/:roomId" element={<DrawingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
