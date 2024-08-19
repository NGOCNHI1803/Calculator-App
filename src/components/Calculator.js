// Calculator.js
import React, { useState, useMemo, useCallback } from 'react';
import InputDataResult from './InputData';
import { evaluate } from 'mathjs';
import './cal.css';
import ControlButton from './Buttons';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  // Hàm xử lý các loại nút khác nhau
  const handleButtonClick = useCallback((type) => {
    if (type === 'clear') {
      handleClear();
    } else if (type === 'delete') {
      handleDelete();
    } else if (type === 'equals') {
      handleEquals();
    } else {
      handleInput(type);
    }
  }, [expression]);

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      const res = evaluate(expression);
      setResult(res);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleInput = (type) => {
    setExpression((prev) => prev + type);
  };

 
  const numberButtons = useMemo(() => ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'], []);
  const operatorButtons = useMemo(() => ['%', '/', '*', '-', '+', '.'], []);

 
  const renderControlButtons = () => (
    <div className="row control-buttons">
      {renderButton('delete', 'CE', 'btn-delete')}
      {renderButton('clear', 'C', 'btn-clear')}
      {operatorButtons.slice(0, 2).map(op => renderButton(op, op, 'btn-operator'))}
    </div>
  );

  const renderNumberButtons = () => (
    <>
      {[0, 3, 6].map(start => (
        <div key={start} className="row">
          {numberButtons.slice(start, start + 3).map(num => renderButton(num, num, 'btn-number'))}
          {renderButton(operatorButtons[start / 3 + 2], operatorButtons[start / 3 + 2], 'btn-operator')}
        </div>
      ))}
      <div className="row">
        {renderButton('0', '0', 'btn-number')}
        {renderButton('.', '.', 'btn-operator')}
        {renderButton('equals', '=', 'btn-equals')}
      </div>
    </>
  );

  const renderButton = (type, label, className) => (
    <ControlButton
      key={type}
      type={type}
      label={label}
      onClick={handleButtonClick}
      className={className}
    />
  );

  return (
    <div className="cal-grid">
      <div className="output">
        <InputDataResult number={expression} result={result} />
      </div>
      <div className="keys">
        {renderControlButtons()}
        {renderNumberButtons()}
      </div>
    </div>
  );
}

export default Calculator;
