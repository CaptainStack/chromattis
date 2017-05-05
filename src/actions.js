export const advance_tile_color = (state, tile) => {
  let tiles = state.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  state.moves++;

  return state;
}

export const highlight_tiles = (state, clicked_tile) => {
  for (let tile of state.board) {
    if (clicked_tile.target_tiles.includes(tile.id)) {
      tile.will_change = true;
    }
  }

  return state;
}

export const clear_highlights = (state) => {
  for (let tile of state.board) {
    tile.will_change = false;
  }
  return state;
}

export const shuffle_colors = (state) => {
  state.moves = 0;
  
  for (let tile of state.board) {
    tile.current_color = Math.floor(Math.random() * 5 + 1);
  }
  return state;
}
