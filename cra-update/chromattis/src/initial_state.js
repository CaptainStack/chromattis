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
  current_display: 'tutorial',
  last_action: null,
  mute_audio: false,
  mute_music: true,
  hide_numbers: false,
  hide_colors: false,
  hide_tooltips: false,
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
  },
};

// Rebuild the redux state by parsing the JSON string in localStorage
if (persisted_state) {
  persisted_state = JSON.parse(persisted_state);
  persisted_state.game.current_level = current_level;
}

export const INITIAL_STATE = persisted_state ? persisted_state : default_content;
