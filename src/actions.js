export const advance_tile_color = (state, tile) => {
  let tiles = state.current_level().board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  state.current_level().moves++;

  if (state.current_level().in_winning_state() && (state.current_level().best_score === 'N/A' || state.current_level().best_score > state.current_level().moves)) {
    state.current_level().best_score = state.current_level().moves;
  }

  state.current_level().currently_selected = null;

  return state;
}

export const previous_tile_color = (state, tile) => {
  let tiles = state.current_level().board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color = updated_tile.current_color === 0 ? 5 : updated_tile.current_color - 1;
  }
  
  state.current_level().moves++;

  if (state.current_level().in_winning_state() && (state.current_level().best_score === 'N/A' || state.current_level().best_score > state.current_level().moves)) {
    state.current_level().best_score = state.current_level().moves;
  }

  return state;
}

export const highlight_tiles = (state, clicked_tile) => {
  for (let tile of state.current_level().board) {
    if (clicked_tile.target_tiles.includes(tile.id)) {
      tile.will_change = true;
    }
  }
  state.current_level().currently_selected = clicked_tile.id;

  return state;
}

export const clear_highlights = (state) => {
  for (let tile of state.current_level().board) {
    tile.will_change = false;
  }
  return state;
}

export const tiles_would_solve_puzzle = (board, target_tiles) => {
  let target_tiles_ids = target_tiles.map(tile => tile.id);
  let updated_colors = board.map(tile => !target_tiles_ids.includes(tile.id) ? tile.current_color : tile.current_color < 5 ? tile.current_color + 1 : 0);

  return updated_colors.every(color => color === updated_colors[0]);
}

export const shuffle_colors = (state) => {
  let board = state.current_level().board;
  let keystone = board[Math.floor(Math.random() * board.length)];
  let best_score = state.current_level().best_score;

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

    state.current_level().moves = 0;
  }
  
  state.current_level().best_score = best_score;

  return state;
}

export const solve_puzzle = (state) => {  
  for (let tile of state.current_level().board) {
    tile.current_color = 0;
  }
  return state;
}

export const navigate_level = (state, level) => {
  if (state.levels.length - 1 >= level) {
    state.current_level_index = level;
  }
  return state;
}
