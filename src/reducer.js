import { INITIAL_STATE } from './initial_state';
import { advance_tile_color, previous_tile_color, preview_tiles, highlight_tiles, clear_highlights, shuffle_colors, solve_puzzle, navigate_level, undo_move } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADVANCE_TILE_COLOR':
      return advance_tile_color(state, action.tile);
    case 'PREVIOUS_TILE_COLOR':
      return previous_tile_color(state, action.tile);
      case 'PREVIEW_TILES':
        return preview_tiles(state, action.tile);
    case 'HIGHLIGHT_TILES':
      return highlight_tiles(state, action.tile);
    case 'CLEAR_HIGHLIGHTS':
      return clear_highlights(state);
    case 'SHUFFLE_COLORS':
      return shuffle_colors(state);
    case 'NAVIGATE_LEVEL':
      return navigate_level(state, action.level)
      case 'UNDO_MOVE':
        return undo_move(state, action.tile);
    case 'SOLVE_PUZZLE':
      return solve_puzzle(state);
    default:
      return state;
  }
}
