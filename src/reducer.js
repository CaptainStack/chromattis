import { INITIAL_STATE } from './initial_state';
import { advance_tile_color, previous_tile_color, highlight_tiles, clear_highlights, shuffle_colors, solve_puzzle, navigate_level } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADVANCE_TILE_COLOR':
      return advance_tile_color(state, action.tile);
    case 'PREVIOUS_TILE_COLOR':
      return previous_tile_color(state, action.tile);
    case 'HIGHLIGHT_TILES':
      return highlight_tiles(state, action.tile);
    case 'CLEAR_HIGHLIGHTS':
      return clear_highlights(state);
    case 'SHUFFLE_COLORS':
      return shuffle_colors(state);
    case 'NAVIGATE_LEVEL':
      return navigate_level(state, action.level)
    case 'SOLVE_PUZZLE':
      return solve_puzzle(state);
    default:
      return state;
  }
}
