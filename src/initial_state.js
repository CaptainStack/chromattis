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

const TileData = (id, target_tiles, will_change, preview, current_color) => ({ id: id, will_change: will_change, preview: preview, current_color: current_color, target_tiles: target_tiles });
const LevelData = (board) => ({
  board: board,
  moves: 0,
  best_score: 'N/A',
  currently_selected: null,
  in_winning_state: in_winning_state,
});

// If there is no persisted_state in localStorage, initialize a new state with shuffled colors.
export const INITIAL_STATE = persisted_state ? persisted_state : shuffle_colors({
  levels: [
    LevelData([TileData(0, [0]), TileData(1, [1])]),
    LevelData([
      TileData(0, [0, 1]), TileData(1, [1]),
    ]),
    LevelData([
      TileData(0, [0, 1]), TileData(1, [0, 2]), TileData(2, [2, 1]),
    ]),
    LevelData([
      TileData(0, [1, 2]), TileData(1, [0, 2]), TileData(2, [0, 1]),
    ]),
    LevelData([
      TileData(0, [0, 1]), TileData(1, [1, 2]),
      TileData(2, [2, 0]), TileData(3, [3, 2]),
    ]),
    LevelData([
      TileData(0, [1, 2, 3]), TileData(1, [0, 1, 2]),
      TileData(2, [2, 3, 0]), TileData(3, [3, 0, 1]),
    ]),
    LevelData([
      TileData(0, [0, 1, 3, 4]), TileData(1, [3, 1, 5]), TileData(2, [1, 2, 5]),
      TileData(3, [0, 3, 4]), TileData(4, [0, 2, 4]), TileData(5, [1, 2, 4, 5]),
    ]),
    LevelData([
      TileData(0, [0, 1, 2]), TileData(1, [1, 3, 4, 5]), TileData(2, [2, 4, 5]),
      TileData(3, [1, 3]), TileData(4, [0, 2, 4]), TileData(5, [1, 2, 4, 5]),
    ]),
    LevelData([
      TileData(0, [0, 1, 3, 4]), TileData(1, [1, 5]), TileData(2, [1, 2, 4, 5]),
      TileData(3, [3, 1]), TileData(4, [4, 5]), TileData(5, [5, 7]),
      TileData(6, [3, 4, 6, 7]), TileData(7, [3, 7]), TileData(8, [4, 5, 7, 8]),
    ]),
    LevelData([
      TileData(0, [0, 1, 3]), TileData(1, [1, 3, 5]), TileData(2, [1, 2, 5]),
      TileData(3, [1, 3, 7]), TileData(4, [1, 3, 5, 7]), TileData(5, [2, 4, 4, 5, 8]),
      TileData(6, [3, 6, 7]), TileData(7, [6, 7, 8, 4]), TileData(8, [5, 7, 8]),
    ]),
    LevelData([
      TileData(0, [0, 1, 4, 5]), TileData(1, [1, 2]), TileData(2, [1, 2]), TileData(3, [2, 3, 6, 7]),
      TileData(4, [4, 8]), TileData(5, [5, 6, 9, 10]), TileData(6, [5, 6, 9, 10]), TileData(7, [7, 11]),
      TileData(8, [4, 8]), TileData(9, [5, 6, 9, 10]), TileData(10, [5, 6, 9, 10]), TileData(11, [7, 11]),
      TileData(12, [8, 9, 12, 13]), TileData(13, [13, 14]), TileData(14, [13, 14]), TileData(15, [10, 11, 14, 15]),
    ]),
    LevelData([
      TileData(0, [0, 1, 2, 3]), TileData(1, [1, 4]), TileData(2, [2, 5, 8]), TileData(3, [3, 6, 9, 12]),
      TileData(4, [4, 5, 6, 7]), TileData(5, [5, 2, 8]), TileData(6, [6, 3, 9, 12]), TileData(7, [7, 10, 13]),
      TileData(8, [8, 9, 10, 11]), TileData(9, [9, 3, 6, 12]), TileData(10, [10, 7, 13]), TileData(11, [11, 14]),
      TileData(12, [12, 13, 14, 15]), TileData(13, [13, 9, 5, 1]), TileData(14, [14, 10, 6, 2]), TileData(15, [15, 11, 7, 3]),
    ]),
  ],
  current_level_index: 0,
  current_level: current_level,
  highest_unlocked_level: highest_unlocked_level,
});
