import React from 'react';
import '../styles/App.css';
import { Game } from './Game';
import { store } from '../index';

export const App = ({state}) => {
  return(
    <div className="App">
      <header>
        <h2>Welcome to Chromattis</h2>
      </header>
      <div className="main-container">
        <div>Moves: {state.moves}</div>
        <button onClick={ () => { store.dispatch({ type: 'SHUFFLE_COLORS' }) } }>New Game</button>
        <Game tiles={state.board} />
      </div>
    </div>
  );
}

export default App;
