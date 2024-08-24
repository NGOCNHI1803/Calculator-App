// Calculator.js
import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { evaluate } from 'mathjs';
import Display from './Display';
import ControlButton from './Buttons';
import '../styles/cal.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { setInput, setResult, clearInput, deleteLastInput, addToHistory } from '../redux/actions';

function Calculator() {
  const input = useSelector((state) => state.input);
  const result = useSelector((state) => state.result);
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberButtons = useMemo(() => ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'], []);
  const operatorButtons = useMemo(() => ['%', '/', '*', '-', '+', '.'], []);

  const handleButtonClick = useCallback((type) => {
    if (numberButtons.includes(type) || operatorButtons.includes(type)) {
      dispatch(setInput(input + type));
    } else if (type === '=') {
      try {
        const result = evaluate(input);
        dispatch(setResult(result));
        dispatch(addToHistory(input, result));
      } catch (error) {
        dispatch(setResult('Error'));
      }
    } else if (type === 'C') {
      dispatch(clearInput());
    } else if (type === 'CE') {
      dispatch(deleteLastInput());
    } else if (type === 'history') {
      navigate('/history', { state: { history } });
    }
  }, [input, numberButtons, operatorButtons, dispatch, navigate, history]);

  const handleKeyboardInput = useCallback((event) => {
    const key = event.key;
    const keyCode = event.keyCode;

    if (numberButtons.includes(key) || operatorButtons.includes(key)) {
      dispatch(setInput(input + key));
    } else if (key === 'Enter' || keyCode === 187) {
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      dispatch(deleteLastInput());
    } else if (key === 'Escape') {
      dispatch(clearInput());
    }
  }, [numberButtons, operatorButtons, input, handleButtonClick, dispatch]);

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
      {operatorButtons.slice(0, 2).map((op) => renderButton(op, op, 'btn-operator'))}
    </div>
  );

  const renderNumberButtons = () => (
    <>
      {[0, 3, 6].map((start) => (
        <div key={start} className="row flex flex-wrap gap-2 mb-2">
          {numberButtons.slice(start, start + 3).map((num) => renderButton(num, num, 'btn-number'))}
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
