export const advance_tile_color = (state, tile) => {
  let tiles = state.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < 5 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
    updated_tile.will_change = false;
  }
  
  return state;
}

export const highlight_tiles = (state, tile) => {
  for (let t of state.board) {
    if (tile.target_tiles.includes(t.id)) {
      t.will_change = true;
    }
  }

  return state;
}