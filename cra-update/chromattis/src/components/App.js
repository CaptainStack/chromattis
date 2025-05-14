import logo from '../logo.svg';
import '../styles/App.css';
import {buttonPressed} from '../events'
import { useSelector } from 'react-redux';
import Child from './Child';

function App() {
  const state = useSelector(state => state);
  // const child = useSelector(state => state.child);
  // const child = useSelector(state => state.child);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{state.title}</h1>
        <Child child={state.child}/>
        <button onClick={buttonPressed}>Press me</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
