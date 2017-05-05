import { store } from './index';

export const tileUpClicked = clicked_tile => event => {
  store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: clicked_tile });
}

export const tileDownClicked = clicked_tile => event => {
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: clicked_tile });
}
