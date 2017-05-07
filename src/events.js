import { store } from './index';

export const tileUpClicked = clicked_tile => event => {
  if (event.button === 0) {
    store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: clicked_tile });
  }
  else if (event.button === 2) {
    store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: clicked_tile });
  }
}

export const tileDownClicked = clicked_tile => event => {
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: clicked_tile });
}

export const newGameButtonClicked = event => {
  let interval = setInterval(function() {
    store.dispatch({ type: 'SHUFFLE_COLORS' })
  }, 50);
  setTimeout(function() { clearInterval(interval) }, 800);
}
