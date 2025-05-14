import { DownClickSound } from "./components/App";

export const toggle_tutorial = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.current_display = state.current_display === 'tutorial' ? 'game' : 'tutorial';
  state.tutorial.current_level_index = 0;
  state.last_action = 'nav';
  return state;
}
export const next_tutorial = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.tutorial.current_level_index = state.tutorial.current_level_index < state.tutorial.levels.length - 1 ? state.tutorial.current_level_index + 1 : state.tutorial.current_level_index;
  return state;
}

export const previous_tutorial = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.tutorial.current_level_index = state.tutorial.current_level_index > 0 ? state.tutorial.current_level_index -= 1 : state.tutorial.current_level_index;
  return state;
}

function recursiveClone(obj, seen = new Set()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (seen.has(obj)) {
    throw new Error('Circular reference detected');
  }

  seen.add(obj);

  if (Array.isArray(obj)) {
    const clonedArray = [];
    for (const item of obj) {
      clonedArray.push(recursiveClone(item, seen));
    }
    return clonedArray;
  }

  if (typeof obj === 'object') {
    const clonedObj = { ...obj };
    for (const key in clonedObj) {
      if (Object.hasOwnProperty.call(clonedObj, key)) {
        clonedObj[key] = recursiveClone(clonedObj[key], seen);
      }
    }
    return clonedObj;
  }

  return obj;
}