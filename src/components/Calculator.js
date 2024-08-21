import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Display from './Display';
import ControlButton from './Buttons';
import useButtonHandler from '../hooks/useButtonHandle';
import '../styles/cal.css';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const numberButtons = useMemo(() => ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'], []);
  const operatorButtons = useMemo(() => ['%', '/', '*', '-', '+', '.'], []);

  const handleButtonHistory = useCallback((input, result) => {
    console.log('Adding to history:', { input, result }); 
    if (input && result !== '' && result !== null) {
      setHistory((prevHistory) => [...prevHistory, { input, result }]);
    }
  }, []);

  const handleButtonClick = useButtonHandler(input, setInput, setResult, handleButtonHistory);

  const handleKeyboardInput = useCallback((event) => {
    console.log('Key pressed:', event.key, event.code, event.keyCode); // Xem mã phím trong console
    const key = event.key;
    const keyCode = event.keyCode;
    
    if (numberButtons.includes(key) || operatorButtons.includes(key)) {
      setInput(prevInput => prevInput + key);
    } else if (key === 'Enter' || keyCode === 187) { 
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      setInput(prevInput => prevInput.slice(0, -1));
    } else if (key === 'Escape') {
      setInput('');
    }
  }, [numberButtons, operatorButtons, handleButtonClick]);
  
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyboardInput]);
  


  const renderControlButtons = () => (
    <div className="row flex flex-wrap gap-2 mb-4">
      {renderButton('CE', 'CE', 'btn-delete')}
      {renderButton('C', 'C', 'btn-clear')}
      {operatorButtons.slice(0, 2).map(op => renderButton(op, op, 'btn-operator'))}
    </div>
  );

  const renderNumberButtons = () => (
    <>
      {[0, 3, 6].map(start => (
        <div key={start} className="row flex flex-wrap gap-2 mb-2">
          {numberButtons.slice(start, start + 3).map(num => renderButton(num, num, 'btn-number'))}
          {renderButton(operatorButtons[start / 3 + 2], operatorButtons[start / 3 + 2], 'btn-operator')}
        </div>
      ))}
      <div className="row flex flex-wrap gap-2">
        {renderButton('0', '0', 'btn-number')}
        {renderButton('.', '.', 'btn-operator')}
        {renderButton('=', '=', 'btn-equals')}
        <button
          onClick={() => navigate('/history', { state: { history } })}
          className="button faClockRotateLeft bg-gray-500 p-4 text-lg rounded-lg focus:outline-none"
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
        </button>
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
        return 'text-red-500';
      case 'btn-equals':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="cal-grid grid gap-4 p-4 max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <Display input={input} result={result} />
      <div className="keys grid gap-4">
        {renderControlButtons()}
        {renderNumberButtons()}
        
      </div>
    </div>
  );
}

export default Calculator;
