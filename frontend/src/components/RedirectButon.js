import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import './component_style.css';

const RedirectButton = ({ to, children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const routeChange = () =>{  
    setLoading(true); // Set loading state to true
    setTimeout(() => {
      window.location.href = to; // Change the URL to the new route after a delay
    }, 1000); // Adjust the delay as needed (1 second in this example)
    }
  
  return (
    <button className="role-button" onClick={routeChange}>{children}</button>
  );
};

export default RedirectButton;