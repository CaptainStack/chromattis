import { store } from './index';

export const buttonPressed = () => store.dispatch({ type: 'UPDATE_ONE' });
