// NumberButton.js
import React from 'react';

const NumberButton = ({ value, onClick }) => {
  return (
    <button onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default NumberButton;
