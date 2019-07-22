import React from 'react';
import './App.scss';
import Router from './router';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import AppProvider from "./components/App/AppProvider";

function App() {
  return (
    <div className="App">
      <AppProvider >
        <BrowserRouter>
          <header>
            <NavBar/>
          </header>
          <main>
            <Router/>
          </main>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
