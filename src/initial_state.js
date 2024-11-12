import { shuffle_colors } from './actions';

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
      } else {
        break;
      }
    }
    return highest_level;
  }

let persisted_state = localStorage.getItem('chromattis_saved_state');

// Rebuild the redux state by parsing the JSON string in localStorage
if (persisted_state) {
  persisted_state = JSON.parse(localStorage.getItem('chromattis_saved_state'));
  persisted_state.current_level = current_level;
  persisted_state.highest_unlocked_level = highest_unlocked_level;

  for (let level of persisted_state.levels) {
    level.in_winning_state = in_winning_state;
  }
}

const Tile = (id, target_tiles, will_change, preview, current_color) => ({ id: id, will_change: will_change, preview: preview, current_color: current_color, target_tiles: target_tiles });
const Level = (board) => ({
  board: board,
  moves: 0,
  best_score: 'N/A',
  currently_selected: null,
  last_move: null,
  in_winning_state: in_winning_state,
});

// If there is no persisted_state in localStorage, initialize a new state with shuffled colors.
export const INITIAL_STATE = persisted_state ? persisted_state : shuffle_colors({
  levels: [
    Level([Tile(0, [0]), Tile(1, [1])]),
    Level([
      Tile(0, [0, 1]), Tile(1, [1]),
    ]),
    Level([
      Tile(0, [0, 1]), Tile(1, [0, 2]), Tile(2, [2, 1]),
    ]),
    Level([
      Tile(0, [1, 2]), Tile(1, [0, 2]), Tile(2, [0, 1]),
    ]),
    Level([
      Tile(0, [0, 1]), Tile(1, [1, 2]),
      Tile(2, [2, 0]), Tile(3, [3, 2]),
    ]),
    Level([
      Tile(0, [1, 2, 3]), Tile(1, [0, 1, 2]),
      Tile(2, [2, 3, 0]), Tile(3, [3, 0, 1]),
    ]),
    Level([
      Tile(0, [0, 1, 3, 4]), Tile(1, [3, 1, 5]), Tile(2, [1, 2, 5]),
      Tile(3, [0, 3, 4]), Tile(4, [0, 2, 4]), Tile(5, [1, 2, 4, 5]),
    ]),
    Level([
      Tile(0, [0, 1, 2]), Tile(1, [1, 3, 4, 5]), Tile(2, [2, 4, 5]),
      Tile(3, [1, 3]), Tile(4, [0, 2, 4]), Tile(5, [1, 2, 4, 5]),
    ]),
    Level([
      Tile(0, [0, 1, 3, 4]), Tile(1, [1, 5]), Tile(2, [1, 2, 4, 5]),
      Tile(3, [3, 1]), Tile(4, [4, 5]), Tile(5, [5, 7]),
      Tile(6, [3, 4, 6, 7]), Tile(7, [3, 7]), Tile(8, [4, 5, 7, 8]),
    ]),
    Level([
      Tile(0, [0, 1, 3]), Tile(1, [1, 3, 5]), Tile(2, [1, 2, 5]),
      Tile(3, [1, 3, 7]), Tile(4, [1, 3, 5, 7]), Tile(5, [2, 4, 4, 5, 8]),
      Tile(6, [3, 6, 7]), Tile(7, [6, 7, 8, 4]), Tile(8, [5, 7, 8]),
    ]),
    Level([
      Tile(0, [0, 1, 4, 5]), Tile(1, [1, 2]), Tile(2, [1, 2]), Tile(3, [2, 3, 6, 7]),
      Tile(4, [4, 8]), Tile(5, [5, 6, 9, 10]), Tile(6, [5, 6, 9, 10]), Tile(7, [7, 11]),
      Tile(8, [4, 8]), Tile(9, [5, 6, 9, 10]), Tile(10, [5, 6, 9, 10]), Tile(11, [7, 11]),
      Tile(12, [8, 9, 12, 13]), Tile(13, [13, 14]), Tile(14, [13, 14]), Tile(15, [10, 11, 14, 15]),
    ]),
    Level([
      Tile(0, [0, 1, 2, 3]), Tile(1, [1, 4]), Tile(2, [2, 5, 8]), Tile(3, [3, 6, 9, 12]),
      Tile(4, [4, 5, 6, 7]), Tile(5, [5, 2, 8]), Tile(6, [6, 3, 9, 12]), Tile(7, [7, 10, 13]),
      Tile(8, [8, 9, 10, 11]), Tile(9, [9, 3, 6, 12]), Tile(10, [10, 7, 13]), Tile(11, [11, 14]),
      Tile(12, [12, 13, 14, 15]), Tile(13, [13, 9, 5, 1]), Tile(14, [14, 10, 6, 2]), Tile(15, [15, 11, 7, 3]),
    ]),
  ],
  current_level_index: 0,
  current_level: current_level,
  highest_unlocked_level: highest_unlocked_level,
});
