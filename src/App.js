import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Contact from './pages/Contact/Contact';
import ExamCalendar from './pages/ExamCalendar/ExamCalendar';
import './App.css';  // Add basic styles for layout

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/exam-calendar" element={<ExamCalendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
