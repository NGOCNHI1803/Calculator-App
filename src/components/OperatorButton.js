import React from 'react';

const OperatorButton = ({ operation, onClick }) => {
  return (
    <button onClick={() => onClick(operation)}>
      {operation}
    </button>
  );
};

export default OperatorButton;