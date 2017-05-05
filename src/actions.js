export const INITIAL_STATE = { 
  board: [{id: 0, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 0, target_tiles: [0,1,3]}, {id: 1, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 1, target_tiles: [1, 3, 5]}, {id: 2, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 5, target_tiles: [1, 2, 5]},
          {id: 3, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 1, target_tiles: [1, 3, 7]}, {id: 4, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 4, target_tiles: [1, 3, 5, 7]}, {id: 5, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 0, target_tiles: [2, 4, 4, 5, 8]},
          {id: 6, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 3, target_tiles: [3, 6, 7]}, {id: 7, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 5, target_tiles: [6, 7, 8, 4]}, {id: 8, color_sequence: [0, 1, 2, 3, 4, 5], current_color: 3, target_tiles: [5, 7, 8]}]
};

export const advance_tile_color = (state, tile) => {
  let tiles = state.board.filter(potential_tile => tile.target_tiles.includes(potential_tile.id));

  for (let updated_tile of tiles) {
    updated_tile.current_color < updated_tile.color_sequence.length - 1 ? updated_tile.current_color += 1 : updated_tile.current_color = 0;
  }
  
  return state;
}
