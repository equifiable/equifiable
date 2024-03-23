import React from 'react';

const Hyperlink = ({ to, children }) => {
  const handleClick = () => {
    window.location.href = to; // Change the URL to the specified route
  };

  return (
    <a href="#" onClick={handleClick}>{children}</a>
  );
};

export default Hyperlink;