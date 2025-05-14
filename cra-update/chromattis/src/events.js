import { store } from './index';

export const buttonPressed = () => store.dispatch({ type: 'UPDATE_ONE' });
export const nextTutorialButtonClicked = () => store.dispatch({ type: 'NEXT_TUTORIAL' });
export const previousTutorialButtonClicked = () => store.dispatch({ type: 'PREVIOUS_TUTORIAL' });
export const tutorialButtonClicked = () => store.dispatch({ type: 'TOGGLE_TUTORIAL' });