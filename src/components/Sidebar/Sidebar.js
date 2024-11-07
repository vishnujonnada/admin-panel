import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Add some basic styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/">Contact</Link>
        </li>
        <li>
          <Link to="/exam-calendar">Exam Calendar</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
