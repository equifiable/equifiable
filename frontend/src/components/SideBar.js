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
          <a href="/company/createstock" className="sidebar-link">
            Create Stock
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/company/pricing" className="sidebar-link">
            Subscription
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
