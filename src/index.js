import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);
export const render = () => ReactDOM.render(<App state={store.getState()} />, document.getElementById('root'));

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').addEventListener(['mouseup', 'touchend'], (event) => {
    if (event.target.className !== 'Tile') {
      store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
    }
  });
}, false);

screen.orientation
.lock("portrait")
.then(() => {
  log.textContent = `Locked to ${oppositeOrientation}\n`;
})
.catch((error) => {
  log.textContent += `${error}\n`;
});
render();
store.subscribe(render);
store.subscribe(() => localStorage.setItem('chromattis_saved_state', JSON.stringify(store.getState())));
