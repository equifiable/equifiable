import React from 'react';
import './component_style.css'; // Import your CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a href="/company/createESOP" className="sidebar-link">
            Create ESOP
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/company/dashboard" className="sidebar-link">
            Dashboard
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            Services
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
