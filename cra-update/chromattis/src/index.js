import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux'

export const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').addEventListener(['mouseup', 'touchend'], event => {
    if (event.target.className !== 'Tile') store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
  });
}, false);

window.matchMedia('(display-mode: standalone)').matches ? 
  store.subscribe(() => localStorage.setItem('gamestate_pwa', JSON.stringify(store.getState()))) : 
  store.subscribe(() => localStorage.setItem('gamestate_browser', JSON.stringify(store.getState())));
