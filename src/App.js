import React from 'react';
import './App.css';
import Router from './router';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import Comments from './components/Comments';

function App() {
  return (
    <BrowserRouter>
      <Router/>
      <NavBar/>
    </BrowserRouter>
  );
}

export default App;
