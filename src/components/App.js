import React from 'react';
import '../styles/App.css';

export const App = ({state}) => 
  <div className="App">
    <header>
      <h2>Welcome to Chromattis</h2>
    </header>
    <div className="main-container">
      {state}
    </div>
  </div>

export default App;
