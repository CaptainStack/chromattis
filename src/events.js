import { store } from './index';

export const tileClicked = clicked_tile => event => {
  store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: clicked_tile });
}
