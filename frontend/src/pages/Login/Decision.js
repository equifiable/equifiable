import React from 'react';
import RedirectButton from '../../components/RedirectButon';
import LogIn from './LogIn'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './Decision.css';

/**
 * Represents a login page component.
 * 
 * @returns A React component that resembles the provided design.
 */
const DecisionPage = () => {
  return (
    
    <div className="container">
      <img className="top-image" src={require('../../assets/logo.png').default} alt="Uber Logo" />
      <h1 className="header">Log in to access your account</h1>
      <div className="role-selector">
        <div className="role-item">
          
          <RedirectButton className="role-button" to="/login">Employee</RedirectButton>
          
        </div>
        <div className="role-item">
        
          <RedirectButton className="role-button" to="/login">Company</RedirectButton>
          
        </div>
      </div>
    </div>
  );
};

export default DecisionPage;
