// Calculator.js
import React, {useState, useMemo} from 'react';
import Display from './Display';
import ControlButton from './Buttons';
import useButtonHandler from '../hooks/useButtonHandle'; // Correct the path if necessary
import '../styles/cal.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = useButtonHandler(input, setInput, setResult);

  const numberButtons = useMemo(() => ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'], []);
  const operatorButtons = useMemo(() => ['%', '/', '*', '-', '+', '.'], []);

  const renderControlButtons = () => (
    <div className="row flex space-x-2 mb-2">
      {renderButton('CE', 'CE', 'btn-delete')}  {/* Corrected button type */}
      {renderButton('C', 'C', 'btn-clear')}   {}
      {operatorButtons.slice(0, 2).map(op => renderButton(op, op, 'btn-operator'))}
    </div>
  );

  const renderNumberButtons = () => (
    <>
      {[0, 3, 6].map(start => (
        <div key={start} className="row flex space-x-2 mb-2">
          {numberButtons.slice(start, start + 3).map(num => renderButton(num, num, 'btn-number'))}
          {renderButton(operatorButtons[start / 3 + 2], operatorButtons[start / 3 + 2], 'btn-operator')}
        </div>
      ))}
      <div className="row flex space-x-2">
        {renderButton('0', '0', 'btn-number')}
        {renderButton('.', '.', 'btn-operator')}
        {renderButton('=', '=', 'btn-equals')} {/* Corrected button type */}
      </div>
    </>
  );

  const renderButton = (type, label, className) => (
    <ControlButton
      key={type}
      value={label}
      onClick={() => handleButtonClick(type)} 
      className={`btn ${className} p-4 text-lg rounded-lg focus:outline-none focus:ring-2 ${getResponsiveStyles(className)}`}
    />
  );

  const getResponsiveStyles = (className) => {
    switch (className) {
      case 'btn-delete':
      case 'btn-clear':
        return 'text-red-500'; // Example: different colors for delete/clear
      case 'btn-equals':
        return 'text-green-500'; // Example: color for equals button
      default:
        return '';
    }
  };

  return (
    <div className="cal-grid grid gap-4 p-4">
     
        <Display input={input} result={result} />
      
      <div className="keys grid gap-4">
        {renderControlButtons()}
        {renderNumberButtons()}
      </div>
    </div>
  );
}

export default Calculator;
