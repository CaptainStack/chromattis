import { INITIAL_STATE } from './initial_state';
import { update_title, update_one } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return update_title(state);
    case 'UPDATE_ONE':
      return update_one(state);
    default:
      return state;
  }
}
