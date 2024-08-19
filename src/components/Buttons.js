import React, { useCallback } from 'react';

const ControlButton = ({ type, label, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(type);
  }, [type, onClick]);

  return (
    <button onClick={handleClick} className={`control-button ${type}`}>
      {label}
    </button>
  );
};

export default ControlButton;
