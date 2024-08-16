// ClearButton.js
import React from 'react';
import './cal.css'

function ClearButton({ label, onClick }) {
  return (
    <button className={`clear-button-${label.toLowerCase()}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default ClearButton;
