import { store } from './index';
import downclick from './audio/downclick.ogg';
import upclick from './audio/upclick.ogg';
import updownclick from './audio/updownclick.ogg';

let upclick_audio = new Audio(upclick);
let downclick_audio = new Audio(downclick);
let updownclick_audio = new Audio(updownclick);

export const cliPrintBoard = () => {
  let board = store.getState().current_level().board;
  console.log(`LEVEL ${store.getState().current_level_index}, MOVE ${store.getState().current_level().moves}`);
  let columns = board.length / Math.floor(Math.sqrt(board.length));

  let row = '[ ';
  for (let i = 0; i < board.length; i++) {
    if (i % columns === 0 && i > 0) {
      row += ']\n[ '
    }
    row += board[i].current_color + ' ';
  }
  row += ']';
  console.log(row);
}

export const cliClick = (tile, reverse) => event => {
  if (!store.getState().current_level().in_winning_state()) {
    reverse ? 
      store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: tile }) : 
      store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: tile });
    updownclick_audio.play();
    cliPrintBoard();
  } else {
    console.log(`This level is currently solved. \nSelect a new level using the next_level(), previous_level(), or goto_level(index) commands. \nReset the puzzle using the shuffle() command.`);
  }
}

export const cliPreview = (tile) => event => {
  if (!store.getState().current_level().in_winning_state()) {
    console.log(`If you press Tile ${tile.id} the following Tiles will change:`);
    console.log(tile.target_tiles);
  } else {
    console.log('This level is currently solved. Select a new level, or reset the puzzle using the shuffle() command.')
  }
}

export const tileUpClicked = (clicked_tile) => event => {
  let current_level = store.getState().current_level();
  let down_clicked_tile = current_level.board[current_level.currently_selected];

  if (event.button === 0 && (clicked_tile.will_change || down_clicked_tile === clicked_tile)) {
    store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: down_clicked_tile });
  }
  else if ((event.button === 2 || event.touches.length == 1) && (clicked_tile.will_change || down_clicked_tile === clicked_tile)) {
    store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: clicked_tile });
  }
  cliPrintBoard();
  store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
  upclick_audio.play();
  event.stopPropagation();
}

export const tileDownClicked = (clicked_tile) => event => {
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: clicked_tile });
  downclick_audio.play();
  event.stopPropagation();
}

export const tileHovered = hovered_tile => event => {
  store.dispatch({ type: 'PREVIEW_TILES', tile: hovered_tile });
}

export const tileUnhovered = hovered_tile => event => {
  store.dispatch({ type: 'CLEAR_HIGHLIGHTS', tile: hovered_tile });
}

export const newGameButtonClicked = event => {
  console.log('Shuffling board...')
  let interval = setInterval(function() {
    store.dispatch({ type: 'SHUFFLE_COLORS' })
  }, 50);
  setTimeout(function() { clearInterval(interval); cliPrintBoard(); }, 800);
}

export const navigateLevelButtonClicked = level_index => event => {
  if (level_index <= store.getState().highest_unlocked_level()) {
    store.dispatch({ type: 'NAVIGATE_LEVEL', level: level_index });
    console.log(`Switching to Level ${level_index}...`);
    setTimeout(() => {cliPrintBoard()}, 500);
  } else {
    console.log(`You haven't unlocked Level ${level_index} yet.`);
  }
  
  let current_level = store.getState().current_level();

  if (current_level.in_winning_state() && current_level.best_score === 'N/A') {
    store.dispatch({ type: 'SHUFFLE_COLORS' });
  }
}
