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
        <div>Arrange the grid so every tile is the same color. Left-click to toggle tiles to the next color. Right-click to toggle them to the previous one.</div>
        <ul>
          <li>Moves: {state.moves}</li>
          <li>Best: {state.best_score}</li>
          <li><button onClick={ () => { store.dispatch({ type: 'SHUFFLE_COLORS' }) } }>New Game</button></li>
          <li><button onClick={ () => { store.dispatch({ type: 'SOLVE_PUZZLE' }) } } style={{ display: 'none' }}>Solve</button></li>
        </ul>
        <Game tiles={state.board} game_in_progress={!state.hasWon()} />
      </div>
    </div>
  );
}

export default App;
