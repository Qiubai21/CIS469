import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your components
import WeatherApp from './components/WeatherApp';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
