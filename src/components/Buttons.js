import React from 'react';

const ControlButton = ({ value, onClick }) => {
  

  return (
    <button 
    onClick={onClick} 
     className="button bg-gray-500 p-4 text-lg rounded-lg focus:outline-none">
      {value}
    </button>
  );
};

export default React.memo(ControlButton);
