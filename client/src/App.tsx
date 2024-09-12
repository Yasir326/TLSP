import React from 'react';
import './styles/main.css';
import LandingPageGenerator from './components/LandingPageGenerator';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Tweet Sized Landing Pages (TLSP)</h1>
      <LandingPageGenerator />
    </div>
  );
};

export default App;