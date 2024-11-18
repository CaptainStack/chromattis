import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);
let application = store.getState();
export const render = () => ReactDOM.render(<App state={application} />, document.getElementById('root'));

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').addEventListener(['mouseup', 'touchend'], event => {
    if (event.target.className !== 'Tile') store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
  });
}, false);

render();
store.subscribe(render);

if (window.matchMedia('(display-mode: standalone)').matches) {
  store.subscribe(() => localStorage.setItem('gamestate_pwa', JSON.stringify(application)));
} else {
  store.subscribe(() => localStorage.setItem('gamestate_browser', JSON.stringify(application)));
}
