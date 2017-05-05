import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);
export const render = () => ReactDOM.render(<App state={store.getState()} />, document.getElementById('root'));

render();
store.subscribe(render);
