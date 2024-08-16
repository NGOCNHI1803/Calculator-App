import React from 'react';
import './cal.css';
const EqualsButton = ({ onClick }) => {
  return (
    
    <button className="equals-button span-two" onClick={onClick}>
      =
    </button>
  );
};

export default EqualsButton;