import { INITIAL_STATE } from './initial_state';
import { advance_tile_color, highlight_tiles, clear_highlights } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADVANCE_TILE_COLOR':
      return advance_tile_color(state, action.tile);
    case 'HIGHLIGHT_TILES':
      return highlight_tiles(state, action.tile);
    case 'CLEAR_HIGHLIGHTS':
      return clear_highlights(state);
    default:
      return state;
  }
}
