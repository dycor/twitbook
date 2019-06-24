import React from 'react';
import './App.css';
import Router from './router';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Router/>
      <NavBar/>
    </BrowserRouter>
  );
}

export default App;
