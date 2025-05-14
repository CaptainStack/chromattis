let in_winning_state = 
  function() {
    for (let i = 1; i < this.board.length; i++) {
      if (this.board[i].current_color !== this.board[i - 1].current_color) {
        return false;
      }
    }
    return true;
  }

let current_level = 
  function() {
    return this.levels[this.current_level_index];
  }

let highest_unlocked_level = 
  function() {
    let highest_level = 0;
    for (let [index, level] of this.levels.entries()) {
      if (level.best_score !== 'N/A') {
        highest_level = index + 1;
      }
    }
    return highest_level;
  }

let persisted_state = localStorage.getItem('gamestate_browser');

const Tile = (id, target_tiles, current_color, will_change, preview) => ({
  id: id, 
  target_tiles: target_tiles, 
  current_color: current_color, 
  will_change: will_change, 
  preview: preview
});
const Level = (board, id) => ({
  board: board,
  id: id,
  moves: 0,
  best_score: 'N/A',
  currently_selected: null,
  last_move: null,
  in_winning_state: in_winning_state,
});

let default_content = {
  game: {
    levels: [
      Level([
        Tile(0, [0]), Tile(1, [1])
      ], '9a3c75b1-4d4176-83dc-ca53a6220071'),
    ],
    current_level_index: 0,
    current_level: current_level,
    highest_unlocked_level: highest_unlocked_level,
  },
};

// Rebuild the redux state by parsing the JSON string in localStorage
if (persisted_state) {
  persisted_state = JSON.parse(persisted_state);
}

export const INITIAL_STATE = persisted_state ? persisted_state : default_content;
