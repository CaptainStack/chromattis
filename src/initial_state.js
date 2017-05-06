export const INITIAL_STATE = { 
  board: [{id: 0, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [0,1,3]}, 
          {id: 1, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [1, 3, 5]}, 
          {id: 2, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [1, 2, 5]},
          {id: 3, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [1, 3, 7]}, 
          {id: 4, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [1, 3, 5, 7]}, 
          {id: 5, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [2, 4, 4, 5, 8]},
          {id: 6, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [3, 6, 7]}, 
          {id: 7, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [6, 7, 8, 4]}, 
          {id: 8, will_change: false, current_color: Math.floor(Math.random() * 5 + 1), target_tiles: [5, 7, 8]}],
  moves: 0,
  hasWon: function() {
    for (let i = 1; i < this.board.length; i++) {
      if (this.board[i].current_color !== this.board[i - 1].current_color) {
        return false;
      }
    }
    return true;
  }
};
