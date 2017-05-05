import { INITIAL_STATE, advance_tile_color, highlight_tiles } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADVANCE_TILE_COLOR':
      return advance_tile_color(state, action.tile);
    case 'HIGHLIGHT_TILES':
      return highlight_tiles(state, action.tile);
    default:
      return state;
  }
}
