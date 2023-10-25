import { store } from './index';
import downclick from './audio/downclick.ogg';
import upclick from './audio/upclick.ogg';

export const tileUpClicked = clicked_tile => event => {
  let audio = new Audio(upclick);
  audio.play();
  let current_level = store.getState().current_level();
  let down_clicked_tile = current_level.board[current_level.currently_selected];

  if (event.button === 0 && (clicked_tile.will_change || down_clicked_tile === clicked_tile)) {
    store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: down_clicked_tile });
  }
  else if (event.button === 2 && (clicked_tile.will_change || down_clicked_tile === clicked_tile)) {
    store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: clicked_tile });
  }
  store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
}

export const tileDownClicked = clicked_tile => event => {
  let audio = new Audio(downclick);
  audio.play();
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: clicked_tile });
}

export const tileHovered = hovered_tile => event => {
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: hovered_tile });
}

export const tileUnhovered = hovered_tile => event => {
  store.dispatch({ type: 'CLEAR_HIGHLIGHTS', tile: hovered_tile });
}

export const newGameButtonClicked = event => {
  let interval = setInterval(function() {
    store.dispatch({ type: 'SHUFFLE_COLORS' })
  }, 50);
  setTimeout(function() { clearInterval(interval) }, 800);
}

export const navigateLevelButtonClicked = level_index => event => {
  store.dispatch({ type: 'NAVIGATE_LEVEL', level: level_index });

  let current_level = store.getState().current_level();

  if (current_level.in_winning_state() && current_level.best_score === 'N/A') {
    store.dispatch({ type: 'SHUFFLE_COLORS' });
  }
}