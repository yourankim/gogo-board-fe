import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Sample from './pages/sample';
import Login from './login/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sample' element={<Sample />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
