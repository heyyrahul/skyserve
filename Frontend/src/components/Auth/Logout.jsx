// Logout.jsx
import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <div>
      <h2>Logout</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Logout;
