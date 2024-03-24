import React from 'react';
import './component_style.css'; // Import your CSS file for styling
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a onClick={()=>{navigate("/company/createESOP")}} className="sidebar-link">
            Create ESOP
          </a>
        </li>
        <li className="sidebar-item">
          <a onClick={()=>{navigate("/company/dashboard")}} className="sidebar-link">
            Dashboard
          </a>
        </li>
        <li className="sidebar-item">
          <a onClick={()=>{navigate("/company/createstock")}} className="sidebar-link">
            Create Stock
          </a>
        </li>
        <li className="sidebar-item">
          <a onClick={()=>{navigate("/company/pricing")}} className="sidebar-link">
            Subscription
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
