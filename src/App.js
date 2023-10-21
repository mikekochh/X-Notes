import './App.css';
import React, { useState } from 'react';
import Header from './Header';

function App() {

  const [theme, setTheme] = useState('dark');

  return (
    <div className={`App theme-${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
