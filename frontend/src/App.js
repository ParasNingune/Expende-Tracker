import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Homepage from './routes/Homepage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={< Login/>} />
          <Route path='/signup' element={< Signup/>} />
          <Route path='/dashboard' element={< Homepage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;