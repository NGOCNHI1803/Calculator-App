import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Calculator from './components/Calculator';
import History from './components/History';
function App() {
  return (
    <Router>
      <Routes>
        < Route path="/" element={<Calculator/>}/>
        < Route path="/history" element={<History/>}/>

      </Routes>
    </Router>
    
    
  );
}

export default App;
