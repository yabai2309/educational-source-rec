import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';  // Import the LandingPage component
import ResultPage from './components/ResultPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
