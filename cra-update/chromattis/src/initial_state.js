let persisted_state = localStorage.getItem('gamestate_browser');

let default_content = {
  title: 'CRA REDUX',
  child: {
    one: 'first',
    two: 'second'
  }
};

// Rebuild the redux state by parsing the JSON string in localStorage
if (persisted_state) {
  persisted_state = JSON.parse(persisted_state);
}

export const INITIAL_STATE = persisted_state ? persisted_state : default_content;
