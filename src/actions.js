import { cliPrintBoard } from "./events";
import { GameMusic } from "./components/App";
import { DownClickSound } from "./components/App";
import { num_displayed_levels } from "./components/LevelNavMenu";

export const advance_tile_color = (state, tile) => {
  let current_level = state.game.current_level();
  let tiles = current_level.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  current_level.moves++;

  if (current_level.in_winning_state() && (current_level.best_score === 'N/A' || current_level.best_score > current_level.moves)) {
    current_level.best_score = current_level.moves;
  }

  current_level.currently_selected = null;
  current_level.last_move = { tile: tile, reverse: false };

  return state;
}

export const previous_tile_color = (state, tile) => {
  let current_level = state.game.current_level();
  let tiles = current_level.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color = updated_tile.current_color === 0 ? 5 : updated_tile.current_color - 1;
  }
  
  current_level.moves++;

  if (current_level.in_winning_state() && (current_level.best_score === 'N/A' || current_level.best_score > current_level.moves)) {
    current_level.best_score = current_level.moves;
  }

  current_level.last_move = { tile: tile, reverse: true };
  return state;
}

export const preview_tiles = (state, hovered_tile) => {
  let current_level = state.game.current_level();
  for (let tile of current_level.board) {
    if (hovered_tile.target_tiles.includes(tile.id)) {
      tile.preview = true;
    }
  }
  current_level.currently_selected = hovered_tile.id;

  return state;
}

export const highlight_tiles = (state, clicked_tile) => {
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
  for (let tile of state.game.current_level().board) {
    tile.preview = false;
    tile.will_change = false;
  }
  return state;
}

export const tiles_would_solve_puzzle = (board, target_tiles) => {
  let target_tiles_ids = target_tiles.map(tile => tile.id);
  let updated_colors = board.map(tile => !target_tiles_ids.includes(tile.id) ? tile.current_color : tile.current_color < 5 ? tile.current_color + 1 : 0);

  return updated_colors.every(color => color === updated_colors[0]);
}

export const shuffle_colors = state => {
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

    current_level.moves = 0;
  }
  
  current_level.best_score = best_score;
  current_level.last_move = null;
  return state;
}

export const navigate_level = (state, level) => {
  if (!state.mute_audio) DownClickSound.play();
  if (state.game.levels.length - 1 >= level) {
    state.game.current_level_index = level;
  }
  return state;
}

export const undo_move = state => {
  if (!state.mute_audio) DownClickSound.play();
  let current_level = state.game.current_level();
  let last_move = current_level.last_move ? current_level.last_move : null;

  if (last_move) {
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

export const toggle_tutorial = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.current_display = state.current_display === 'tutorial' ? 'game' : 'tutorial';
  state.tutorial.current_level_index = 0;
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
  return state;
}

export const toggle_mute_music = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.mute_music = !state.mute_music;
  state.mute_music ? GameMusic.pause() : GameMusic.play();
  return state;
}

export const toggle_hide_numbers = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_numbers = !state.hide_numbers;
  return state;
}

export const toggle_hide_colors = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_colors = !state.hide_colors;
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
  return state;
}

export const toggle_hide_tooltips = state => {
  if (!state.mute_audio) DownClickSound.play();
  state.hide_tooltips = !state.hide_tooltips;
  return state;
}