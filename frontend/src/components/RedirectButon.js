import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './component_style.css';

const RedirectButton = ({ to, children }) => {
  const navigate = useNavigate();

  const routeChange = () =>{ 
      let path = `newPath`; 
      navigate(path);
    }
  
  return (
    <button className="role-button" onClick={routeChange}>{children}</button>
  );
};

export default RedirectButton;