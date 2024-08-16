// src/InputDataResult.js
import React from 'react';
import './cal.css';

const InputDataResult = ({ number, result, onChange }) => {
    return (
      <div className="input-data-result">
        <input
          type="text"
          id="display"
          value={number}
          onChange={onChange}
         
          
        />
        <h3> {result || 0}</h3>
      </div>
    );
  };
  
  export default InputDataResult;
