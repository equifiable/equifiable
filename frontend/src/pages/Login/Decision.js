// LoginPage.js
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
      <h1 className="header">Log in to access your account</h1>
      <div className="profile-pictures">
        {/* You'll replace the src with the path to your image assets */}
        <img className="profile-picture" src="src/assets/logo.png" alt="Driver" />
        <img className="profile-picture" src="src/assets/logo.png" alt="Rider" />
      </div>
      <div className="role-selector">
        <div className="role-item">
          Driver
          <span className="arrow">→</span>
        </div>
        <div className="role-item">
          Rider
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;