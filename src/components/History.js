import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const history = location.state?.history || []; // Lấy dữ liệu history từ state

  return (
    <div className="history-container">
      <h2>Calculation History</h2>
      <div className="history">
        {history.length ? (
          history.map((entry, index) => (
            <div key={index} className="history-entry">
              <span>{entry.input} = {entry.result}</span>
            </div>
          ))
        ) : (
          <div className="no-history">There's no history yet.</div>
        )}
      </div>
      <button
        onClick={() => navigate('/')}
        className="button history bg-gray-500 p-4 text-lg rounded-lg focus:outline-none"
      >
        <FontAwesomeIcon icon={faCalculator} className='btn-fa' /> 
      </button>
    </div>
  );
};

export default History;
