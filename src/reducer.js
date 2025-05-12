import { INITIAL_STATE } from './initial_state';
import { 
  advance_tile_color, previous_tile_color, preview_tiles, highlight_tiles, 
  clear_highlights, shuffle_colors, navigate_level, undo_move, 
  toggle_tutorial, next_tutorial, previous_tutorial, toggle_mute_audio,
  toggle_mute_music, toggle_hide_numbers, toggle_hide_colors,
  next_level_nav_page, previous_level_nav_page, toggle_level_nav_menu,
  toggle_hide_tooltips, null_last_action, select_tile, toggle_achievements,
 } from './actions';

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
      return navigate_level(state, action.level);
    case 'UNDO_MOVE':
      return undo_move(state, action.tile);
    case 'TOGGLE_TUTORIAL':
      return toggle_tutorial(state);
    case 'TOGGLE_ACHIEVEMENTS':
      return toggle_achievements(state);
    case 'NEXT_TUTORIAL':
      return next_tutorial(state);
    case 'PREVIOUS_TUTORIAL':
      return previous_tutorial(state);
    case 'TOGGLE_MUTE_SOUND':
      return toggle_mute_audio(state);
    case 'TOGGLE_MUTE_MUSIC':
      return toggle_mute_music(state);
    case 'TOGGLE_HIDE_NUMBERS':
      return toggle_hide_numbers(state);
    case 'TOGGLE_HIDE_COLORS':
      return toggle_hide_colors(state);
    case 'NEXT_LEVEL_NAVIGATION_PAGE':
      return next_level_nav_page(state);
    case 'PREVIOUS_LEVEL_NAVIGATION_PAGE':
      return previous_level_nav_page(state);
    case 'TOGGLE_LEVEL_NAVIGATION_MENU':
      return toggle_level_nav_menu(state);
    case 'TOGGLE_HIDE_TOOLTIPS':
      return toggle_hide_tooltips(state);
    case 'NULL_LAST_ACTION':
      return null_last_action(state);
    case 'SELECT_TILE':
      return select_tile(state, action.tile_id);
    default:
      return state;
  }
}
