import { INITIAL_STATE } from './initial_state';
import { 
  toggle_tutorial, next_tutorial, previous_tutorial, toggle_achievements,
 } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_TUTORIAL':
      return toggle_tutorial(state);
    case 'NEXT_TUTORIAL':
      return next_tutorial(state);
    case 'PREVIOUS_TUTORIAL':
      return previous_tutorial(state);
    default:
      return state;
  }
}
