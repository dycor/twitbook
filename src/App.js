import React from 'react';
import './App.css';
import Router from './router';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import AppProvider from "./components/App/AppProvider";

function App() {
  return (
    <AppProvider >
      <BrowserRouter>
        <Router/>
        <NavBar/>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
