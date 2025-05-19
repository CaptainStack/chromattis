import { cliPrintBoard } from './events';
import { GameMusic } from './components/App';
import { DownClickSound } from './components/App';
import { num_displayed_levels } from './components/LevelNavMenu';

export const select_tile = (state, tile_id) => {
  let current_level = state.game.current_level();
  current_level.currently_selected = tile_id;
  clear_highlights(state);
  preview_tiles(state, current_level.board[tile_id]);
  return state;
}

export const advance_tile_color = (state, tile) => {
  let current_level = state.game.current_level();
  let tiles = current_level.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));
  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  current_level.moves++;

  if (current_level.in_winning_state()) {
    if (current_level.best_score === 'N/A' || current_level.best_score > current_level.moves) {
    current_level.best_score = current_level.moves;
    }
  }

  preview_tiles(state, current_level.board[tile.id]);
  current_level.last_move = { tile: tile, reverse: false };

  state.last_action = 'clicktile';

  return state;
}

export const update_achievement_text = (state, text) => {
  state.achievement_text = text;
  return state;
}

export const previous_tile_color = (state, tile) => {
  let current_level = state.game.current_level();
  let tiles = current_level.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color = updated_tile.current_color === 0 ? 5 : updated_tile.current_color - 1;
  }
  
  current_level.moves++;

  if (current_level.in_winning_state()) {
    if (current_level.best_score === 'N/A' || current_level.best_score > current_level.moves) {
    current_level.best_score = current_level.moves;
    }
  }

  preview_tiles(state, current_level.board[tile.id]);
  current_level.last_move = { tile: tile, reverse: true };
  state.last_action = 'clicktile';
  return state;
}

export const preview_tiles = (state, selected_tile) => {
  if (selected_tile) {
    let current_level = state.game.current_level();
    for (let tile of current_level.board) {
      if (selected_tile.target_tiles.includes(tile.id)) {
        tile.preview = true;
      }
    }
    current_level.currently_selected = selected_tile.id;
  }
  return state;
}

export const highlight_tiles = (state, clicked_tile) => {
  clear_highlights(state);
  let current_level = state.game.current_level();
  for (let tile of current_level.board) {
    if (clicked_tile.target_tiles.includes(tile.id)) {
      tile.will_change = true;
      tile.preview = false;
    }
  }
  current_level.currently_selected = clicked_tile.id;

  return state;
}

export const clear_highlights = state => {
  let level = state.game.current_level();
  for (let tile of level.board) {
    tile.preview = false;
    tile.will_change = false;
  }
  level.currently_selected = null;
  return state;
}

export const tiles_would_solve_puzzle = (board, target_tiles) => {
  let target_tiles_ids = target_tiles.map(tile => tile.id);
  let updated_colors = board.map(tile => !target_tiles_ids.includes(tile.id) ? tile.current_color : tile.current_color < 5 ? tile.current_color + 1 : 0);

  return updated_colors.every(color => color === updated_colors[0]);
}

export const shuffle_colors = (state, first_load) => {
  clear_highlights(state);
  state.current_display = first_load === null ? 'tutorial' : 'game';
  let current_level = state.game.current_level()
  let board = current_level.board;
  let keystone = board[Math.floor(Math.random() * board.length)];
  let best_score = current_level.best_score;

  for (let tile of board) {
    if (tile === keystone || keystone.target_tiles.includes(tile.id)) {
      tile.current_color = 0;
    } else {
      tile.current_color = 1;
    }
  }

  for (let i = 0; i < 1000; i++) {
    let shffle_tile_index = Math.floor(Math.random() * board.length);
    let shuffle_tile = board[shffle_tile_index];

    let target_tiles = board.filter(tile => shuffle_tile.target_tiles.includes(tile.id));

    // Don't solve the puzzle while shuffling
    if (!tiles_would_solve_puzzle(board, target_tiles)) {
      advance_tile_color(state, shuffle_tile);
    } else {
      previous_tile_color(state, shuffle_tile);
    }
    clear_highlights(state)
  }

  // Don't leave the board within one click of solving the puzzle
  for (let shuffle_tile of board) {
    let target_tiles = board.filter(tile => shuffle_tile.target_tiles.includes(tile.id));
    if (tiles_would_solve_puzzle(board, target_tiles)) {
      previous_tile_color(state, shuffle_tile);
      previous_tile_color(state, shuffle_tile);
    }
  }

  current_level.moves = 0;
  current_level.best_score = best_score;
  current_level.last_move = null;
  state.last_action = 'shuffle';
  return state;
}

export const navigate_level = (state, level) => {
  if (!state.mute_audio) DownClickSound.play();
  if (state.game.levels.length - 1 >= level) {
    state.game.current_level_index = level;
  }
  state.current_display = 'game';
  state.last_action = 'nav';
  return state;
}

export const undo_move = state => {
  if (!state.mute_audio) DownClickSound.play();
  let current_level = state.game.current_level();
  let last_move = current_level.last_move ? current_level.last_move : null;

  if (last_move) {
    state.current_display = 'game';
    console.log('Undoing last move...');
    if (last_move.reverse) {
      advance_tile_color(state, last_move.tile);
      current_level.last_move = null;
      current_level.moves -= 2;
    } else {
      previous_tile_color(state, last_move.tile);
      current_level.last_move = null;
      current_level.moves -= 2;
    }
    setTimeout(() => {cliPrintBoard()}, 500);
  } else {
    console.log('You can only undo your last move.');
  }

  return state;
}

export const toggle_achievements = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.current_display = state.current_display === 'achievements' ? 'game' : 'achievements';
  state.last_action = 'nav';
  return state;
}

export const toggle_tutorial = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.current_display = state.current_display === 'tutorial' ? 'game' : 'tutorial';
  state.tutorial.current_level_index = 0;
  state.last_action = 'nav';
  return state;
}
export const next_tutorial = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.tutorial.current_level_index < state.tutorial.levels.length - 1 ? state.tutorial.current_level_index += 1 : state.tutorial.current_level_index;
  return state;
}

export const previous_tutorial = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.tutorial.current_level_index > 0 ? state.tutorial.current_level_index -= 1 : state.tutorial.current_level_index;
  return state;
}

export const toggle_mute_audio = state => {
  state.mute_audio = !state.mute_audio;
  if (!state.mute_audio) DownClickSound.play();
  state.last_action = 'settings';
  return state;
}

export const toggle_mute_music = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.mute_music = !state.mute_music;
  GameMusic.volume = 0.5; 
  state.mute_music ? GameMusic.pause() : GameMusic.play();
  state.last_action = 'settings';
  state.music_enabled_once = true;
  return state;
}

export const toggle_hide_numbers = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_numbers = !state.hide_numbers;
  state.last_action = 'settings';
  return state;
}

export const toggle_hide_colors = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_colors = !state.hide_colors;
  state.last_action = 'settings';
  return state;
}

export const next_level_nav_page = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.level_nav_page = 
    state.level_nav_page * num_displayed_levels + num_displayed_levels >= state.game.levels.length ? 
      state.level_nav_page : 
      state.level_nav_page += 1;
  return state;
}

export const previous_level_nav_page = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.level_nav_page = state.level_nav_page > 0 ? state.level_nav_page -= 1 : 0;
  return state;
}

export const toggle_level_nav_menu = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.current_display = state.current_display === 'nav' ? 'game' : 'nav';
  state.last_action = 'nav';
  return state;
}

export const toggle_hide_tooltips = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_tooltips = !state.hide_tooltips;
  state.last_action = 'settings';
  return state;
}

export const null_last_action = state => {
  state.last_action = null;
  return state;
}

export const sync_pulse_animations = () => {
  let anims = document.getAnimations();
  for (let animation of anims) {
    if (animation.animationName === 'pulse')
    animation.currentTime = 0;
  }
}
