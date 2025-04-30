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
      }
    }
    return highest_level;
  }

let device_is_pwa = window.matchMedia('(display-mode: standalone)').matches ? true : false;
let persisted_state = device_is_pwa ? localStorage.getItem('gamestate_pwa') : localStorage.getItem('gamestate_browser');

// Rebuild the redux state by parsing the JSON string in localStorage
if (persisted_state) {
  persisted_state = JSON.parse(persisted_state);
  persisted_state.game.current_level = current_level;
  persisted_state.game.highest_unlocked_level = highest_unlocked_level;
  persisted_state.mute_music = true;

  for (let level of persisted_state.game.levels) {
    level.in_winning_state = in_winning_state;
  }
}

const Tile = (id, target_tiles, current_color, will_change, preview) => ({id: id, target_tiles: target_tiles, current_color: current_color, will_change: will_change, preview: preview});
const Level = (board, id) => ({
  board: board,
  id: id,
  moves: 0,
  best_score: 'N/A',
  currently_selected: null,
  last_move: null,
  in_winning_state: in_winning_state,
});

let default_content = 
{
  current_display: 'tutorial',
  show_level_nav: true,
  level_nav_page: 0,
  mute_audio: false,
  mute_music: true,
  hide_numbers: false,
  hide_colors: false,
  hide_tooltips: false,
  last_action: null,
  game: {
    levels: [
      Level([
        Tile(0, [0]), Tile(1, [1])
      ], '9a3c75b1-4d4176-83dc-ca53a6220071'),
      Level([
        Tile(0, [1]), Tile(1, [0, 1]),
      ], 'd5b2cd45-4ff7-4a8b-bf1d-82a64a0d5ea0'),
      Level([
        Tile(0, [0, 1]), Tile(1, [0, 2]), Tile(2, [2, 1]),
      ], '1a49af532c-4bbd-bfb0-a6ab2094c3c1'),
      Level([
        Tile(0, [1, 2]), Tile(1, [0, 2]), Tile(2, [0, 1]),
      ], 'afedc58f-574fbd-a06c-1010fcfdd6e6'),
      Level([
        Tile(0, [0, 1]), Tile(1, [1, 2]),
        Tile(2, [2, 0]), Tile(3, [3, 2]),
      ], '0024214a8e-427c-99bb-b0222f1ec099'),
      Level([
        Tile(0, [1, 2, 3]), Tile(1, [0, 1, 2]),
        Tile(2, [2, 3, 0]), Tile(3, [3, 0, 1]),
      ], '61dce9b6-93496a-9af3-e942c297e8c6'),
      Level([
        Tile(0, [0, 1, 3, 4]), Tile(1, [3, 1, 5]), Tile(2, [1, 2, 5]),
        Tile(3, [0, 3, 4]), Tile(4, [0, 2, 4]), Tile(5, [1, 2, 4, 5]),
      ], 'a3109dd9-b15d-4d80eb-dc6c6f485e76'),
      Level([
        Tile(0, [0, 1, 2]), Tile(1, [1, 3, 4, 5]), Tile(2, [2, 4, 5]),
        Tile(3, [1, 3]), Tile(4, [0, 2, 4]), Tile(5, [1, 2, 4, 5]),
      ], '50c1e6c9eb-431c-a8ca-e8e4b6b885d4'),
      Level([
        Tile(0, [0, 1, 3, 4]), Tile(1, [1, 5]), Tile(2, [1, 2, 4, 5]),
        Tile(3, [3, 1]), Tile(4, [4, 5]), Tile(5, [5, 7]),
        Tile(6, [3, 4, 6, 7]), Tile(7, [3, 7]), Tile(8, [4, 5, 7, 8]),
      ], 'd14b238923-4efa-8d13-6635965ab5b3'),
      Level([
        Tile(0, [0, 1, 3]), Tile(1, [1, 3, 5]), Tile(2, [1, 2, 5]),
        Tile(3, [1, 3, 7]), Tile(4, [1, 3, 5, 7]), Tile(5, [2, 4, 4, 5, 8]),
        Tile(6, [3, 6, 7]), Tile(7, [6, 7, 8, 4]), Tile(8, [5, 7, 8]),
      ], 'c0b74e6e-4f48b2-a971-65993bfcacd2'),
      Level([
        Tile(0, [0, 1, 4, 5]), Tile(1, [1, 2]), Tile(2, [1, 2]), Tile(3, [2, 3, 6, 7]),
        Tile(4, [4, 8]), Tile(5, [5, 6, 9, 10]), Tile(6, [5, 6, 9, 10]), Tile(7, [7, 11]),
        Tile(8, [4, 8]), Tile(9, [5, 6, 9, 10]), Tile(10, [5, 6, 9, 10]), Tile(11, [7, 11]),
        Tile(12, [8, 9, 12, 13]), Tile(13, [13, 14]), Tile(14, [13, 14]), Tile(15, [10, 11, 14, 15]),
      ], '4d68914f-f84bc1-a921-f69702075562'),
      Level([
        Tile(0, [0, 1, 2, 3]), Tile(1, [1, 4]), Tile(2, [2, 5, 8]), Tile(3, [3, 6, 9, 12]),
        Tile(4, [4, 5, 6, 7]), Tile(5, [5, 2, 8]), Tile(6, [6, 3, 9, 12]), Tile(7, [7, 10, 13]),
        Tile(8, [8, 9, 10, 11]), Tile(9, [9, 3, 6, 12]), Tile(10, [10, 7, 13]), Tile(11, [11, 14]),
        Tile(12, [12, 13, 14, 15]), Tile(13, [13, 9, 5, 1]), Tile(14, [14, 10, 6, 2]), Tile(15, [15, 11, 7, 3]),
      ], 'a524afce-86b3-48be23-af502cb80829'),
      Level([
        Tile(0, [0,1,2, 5,6, 10]), Tile(1, [1,7,13,19]), Tile(2, [1,2,3, 7,]), Tile(3, [3,7,11,15]), Tile(4, [4,3,2, 9,8, 14]),
        Tile(5, [5,11,17,23]), Tile(6, [0,1,2, 5,6,7, 10,11,12]), Tile(7, [2,6,7,8,10, 11,13,14, 16,17,18,22]), Tile(8, [4,3,2, 9,8,7, 14,13,12]), Tile(9, [9,13,17,21]),
        Tile(10, [5,10,15, 11]), Tile(11, [2,6,7,8,10, 11,13,14, 16,17,18,22]), Tile(12, [0,4,6,8, 12, 16,18,20,24]), Tile(13, [2,6,7,8,10, 11,13,14, 16,17,18,22]), Tile(14, [9,14,19, 13,]),
        Tile(15, [3,7,11,15]), Tile(16, [20,21,22, 15,16,17, 10,11,12]), Tile(17, [2,6,7,8,10, 11,13,14, 16,17,18,22]), Tile(18, [24,23,22, 19,18,17, 14,13,12]), Tile(19, [1,7,13,19]),
        Tile(20, [20,21,22, 15,16, 10,]), Tile(21, [9,13,17,21]), Tile(22, [21,22,23, 17]), Tile(23, [5,11,17,23]), Tile(24, [24,23,22, 19,18, 14]),
      ], 'b16b2728-ec5e-4391-a371-147d2138f52e'),
    ],
    current_level_index: 0,
    current_level: current_level,
    highest_unlocked_level: highest_unlocked_level,
  },
  tutorial: {
    levels: [
      {
        text: 'Welcome to Chromattis! Tap "OPEN TUTORIAL" below to restart this tutorial any time.',
        image: '00-grid.gif',
      },
      {
        text: 'Chromattis is a puzzle made up of a grid of tiles',
        image: '00-grid.gif',
      },
      {
        text: 'Each tile has a value represented as both a color and a number',
        image: '01-values.gif',
      },
      {
        text: 'Tap/click a tile to advance a set of tiles to the next color',
        image: '02-tap.gif',
      },
      {
        text: 'There are six colors that tiles can cycle through',
        image: '03-cycle.gif',
      },
      {
        text: '0 = red, 1 = orange, 2 = yellow, 3 = green, 4 = blue, 5 = white',
        image: '03-cycle.gif',
      },
      {
        text: 'The goal of the puzzle is to get every tile to share the same value',
        image: '04-solving.gif',
      },
      {
        text: 'Try to solve in as few moves as possible for a challenge',
        image: '05-moves.gif',
      },
      {
        text: 'A tile can impact one or more tiles in the grid',
        image: '06-multiple.gif',
      },
      {
        text: "The selected tile isn't always one that changes",
        image: '07-others.gif',
      },
      {
        text: "Hover your cursor or long press to preview which tiles will change",
        image: '08-preview.gif',
      },
      {
        text: 'Drag your finger off the tile to cancel a move',
        image: '09-cancel.gif',
      },
      {
        text: 'Right click or two-finger tap to go in the reverse direction',
        image: '10-reverse.gif',
      },
      {
        text: 'Undo your last move with the undo button',
        image: '11-undo.gif',
      },
      {
        text: 'The reset button shuffles the board and resets the move counter',
        image: '12-shuffle.gif',
      },
      {
        text: 'Those are the basics! Keep going for tips and strategies',
        image: '04-solving.gif',
      },
      {
        text: 'Six consecutive taps on one tile returns the board where it started',
        image: '13-sixpress.gif',
      },
      {
        text: 'Three consecutive taps "inverts" a set\'s colors',
        image: '14-invert.gif',
      },
      {
        text: "Don't try and solve everything at once, start with smaller goals",
        image: '04-solving.gif',
      },
      {
        text: 'Try getting the corners of the puzzle to match',
        image: '15-corners.gif',
      },
      {
        text: 'Try reducing the board to just two colors',
        image: '16-twocolors.gif',
      },
      {
        text: 'Reduce the number of nonconforming tiles from there',
        image: '17-reduce.gif',
      },
      {
        text: 'Install Chromattis as an app for the best experience',
        image: '18-install.gif',
      },
      {
        text: 'Good luck have fun!',
        image: '04-solving.gif',
      },
    ],
    current_level_index: 0,
    current_level: current_level,
    highest_unlocked_level: highest_unlocked_level,
  }
}

// If new levels have been added to the game, merge them into the player's saved state
// so they receive the new content without losing their progress.
if (persisted_state && persisted_state.game.levels.length !== default_content.game.levels.length) {
  let default_levels = default_content.game.levels.slice();

  for (let [index, level] of default_levels.entries()) {
    let matched_level = persisted_state.game.levels.find(saved_level => saved_level.id === level.id);
    default_levels[index] =  matched_level ? matched_level : default_levels[index];
  }

  persisted_state.game.levels = default_levels;
  persisted_state.game.current_level_index = 0;
}

// If there is no persisted_state in localStorage, initialize a new state with shuffled colors.
export const INITIAL_STATE = persisted_state ? persisted_state : shuffle_colors(default_content);
