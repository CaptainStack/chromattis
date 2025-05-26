import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App';
import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);
const application = store.getState();
const root = createRoot(document.getElementById('root'));
const render = () => root.render(<StrictMode><App state={application}/></StrictMode>);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').addEventListener('mousedown', event => {
    if (event.target.className !== 'Tile') store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {scope: '/chromattis/'});
  }
}, false);

render();
store.subscribe(render);

window.matchMedia('(display-mode: standalone)').matches ? 
  store.subscribe(() => localStorage.setItem('gamestate_pwa', JSON.stringify(application))) :
  store.subscribe(() => localStorage.setItem('gamestate_browser', JSON.stringify(application)));
