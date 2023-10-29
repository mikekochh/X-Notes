import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Settings from './components/Settings/Settings';

function App() {
  
  const [theme, setTheme] = useState('light');

  return (
    <div className={`App theme-${theme} relative`}>
      <Header theme={theme} setTheme={setTheme} />
      <MainPage />
      <Settings theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
