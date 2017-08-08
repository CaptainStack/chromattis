export const advance_tile_color = (state, tile) => {
  let tiles = state.current_level().board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  state.current_level().moves++;

  if (state.current_level().in_winning_state() && (state.current_level().best_score === 'N/A' || state.current_level().best_score > state.current_level().moves)) {
    state.current_level().best_score = state.current_level().moves;
  }

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

  return state;
}

export const clear_highlights = (state) => {
  for (let tile of state.current_level().board) {
    tile.will_change = false;
  }
  return state;
}

export const shuffle_colors = (state) => {
  let board = state.current_level().board;
  let keystone = board[0];
  let best_score = state.current_level().best_score;

  for (let tile of board) {
    if (tile === keystone || keystone.target_tiles.includes(tile.id)) {
      tile.current_color = 0;
    } else {
      tile.current_color = 1;
    }
  }

  for (let i = 0; i < 1000; i++) {
    advance_tile_color(state, board[Math.floor(Math.random() * board.length)]);
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
