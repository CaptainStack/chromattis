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
        <div>Goal: Arrange the grid so every tile is the same color</div>
        <div>Moves: {state.moves}</div>
        <div>Best: {state.best_score}</div>
        <button onClick={ () => { store.dispatch({ type: 'SHUFFLE_COLORS' }) } }>New Game</button>
        <button onClick={ () => { store.dispatch({ type: 'SOLVE_PUZZLE' }) } } style={{ display: 'none' }}>Solve</button>
        <Game tiles={state.board} game_in_progress={!state.hasWon()} />
      </div>
    </div>
  );
}

export default App;
