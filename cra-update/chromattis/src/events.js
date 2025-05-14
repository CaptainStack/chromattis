import { store } from './index';

export const muteMusicButtonClicked = () => {
  // let application = store.getState();
  // let achievements = application.completed_achievements();

  store.dispatch({ type: 'TOGGLE_MUTE_MUSIC' });

  // let new_achievements = application.completed_achievements();
  // processAchievemeNotifications(achievements, new_achievements);
}

export const buttonPressed = () => store.dispatch({ type: 'UPDATE_ONE' });
export const nextTutorialButtonClicked = () => store.dispatch({ type: 'NEXT_TUTORIAL' });
export const previousTutorialButtonClicked = () => store.dispatch({ type: 'PREVIOUS_TUTORIAL' });
export const tutorialButtonClicked = () => store.dispatch({ type: 'TOGGLE_TUTORIAL' });
export const muteSoundButtonClicked = () => store.dispatch({ type: 'TOGGLE_MUTE_SOUND' });
export const hideNumbersButtonClicked = () => store.dispatch({ type: 'TOGGLE_HIDE_NUMBERS' });
export const hideColorsButtonClicked = () => store.dispatch({ type: 'TOGGLE_HIDE_COLORS' });
export const toggleHideTooltips = () => store.dispatch({ type: 'TOGGLE_HIDE_TOOLTIPS' });