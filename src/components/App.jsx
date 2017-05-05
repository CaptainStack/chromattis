import React from 'react';
import '../styles/App.css';
import { Game } from './Game';

export const App = ({state}) => {
  return(
    <div className="App">
      <header>
        <h2>Welcome to Chromattis</h2>
      </header>
      <div className="main-container">
        <Game tiles={state.board} />
      </div>
    </div>
  );
}

export default App;
