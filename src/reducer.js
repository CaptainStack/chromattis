import { INITIAL_STATE, advance_tile_color } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADVANCE_TILE_COLOR':
      return advance_tile_color(state, action.tile);
    default:
      return state;
  }
}
