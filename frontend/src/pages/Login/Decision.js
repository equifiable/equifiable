import React from 'react';
import './Decision.css';

/**
 * Represents a login page component.
 * 
 * @returns A React component that resembles the provided design.
 */
const LoginPage = () => {
  return (
    <div className="container">
      <img className="top-image" src={require('../../assets/logo.png').default} alt="Uber Logo" />
      <h1 className="header">Log in to access your account</h1>
      <div className="role-selector">
        <div className="role-item">
          Employee
          <span className="arrow">→</span>
        </div>
        <div className="role-item">
          Company
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
