// Calculator.js
import React, { useState, useMemo, useCallback } from 'react';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import ClearButton from './ClearButton';
import ResultButton from './ResultButton';
import InputDataResult from './InputData';
import { evaluate } from 'mathjs';
import './cal.css';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleNumberClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleOperatorClick = (operation) => {
    setExpression((prev) => prev + operation);
  };

  const handleEqualsClick = () => {
    try {
      const res = evaluate(expression);
      setResult(res);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = useCallback(() => {
    setExpression((prevInput) => prevInput.slice(0, -1));
  }, []);

  const numberButtons = useMemo(() => [7, 8, 9, 4, 5, 6, 1, 2, 3, 0], []);
  const operatorButtons = useMemo(() => ['%', '/', '*', '-', '+'], []);

  return (
    <div className="cal-grid">
      <div className="output">
        <InputDataResult number={expression} result={result} />
      </div>
      <div className="keys">
        <div className="row">
          <ClearButton label="CE" onClick={handleDelete}/>
          <ClearButton label="C" onClick={handleClear} />
          {operatorButtons.slice(0, 2).map((op) => (
            <OperatorButton key={op} operation={op} onClick={handleOperatorClick} />
          ))}
        </div>
        {[0, 3, 6].map((start) => (
          <div key={start} className="row">
            {numberButtons.slice(start, start + 3).map((num) => (
              <NumberButton key={num} value={num} onClick={handleNumberClick} />
            ))}
            <OperatorButton
              operation={operatorButtons[start / 3 + 2]}
              onClick={handleOperatorClick}
            />
          </div>
        ))}
        <div className="row">
          <NumberButton value={0} onClick={handleNumberClick} />
          <OperatorButton operation="." onClick={handleOperatorClick} />
          <ResultButton onClick={handleEqualsClick} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
