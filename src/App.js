import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`App theme-${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <MainPage />
    </div>
  );
}

export default App;
