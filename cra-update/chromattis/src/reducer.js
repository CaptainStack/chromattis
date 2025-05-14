import { INITIAL_STATE } from './initial_state';
import { 
  advance_tile_color, previous_tile_color, preview_tiles, highlight_tiles, 
  clear_highlights, shuffle_colors, navigate_level, undo_move, 
  toggle_tutorial, next_tutorial, previous_tutorial, toggle_mute_audio,
  toggle_mute_music, toggle_hide_numbers, toggle_hide_colors,
  next_level_nav_page, previous_level_nav_page, toggle_level_nav_menu,
  toggle_hide_tooltips, null_last_action, select_tile, toggle_achievements,
  update_achievement_text,
 } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_TUTORIAL':
      return toggle_tutorial(state);
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
    case 'TOGGLE_HIDE_TOOLTIPS':
      return toggle_hide_tooltips(state);
    default:
      return state;
  }
}
