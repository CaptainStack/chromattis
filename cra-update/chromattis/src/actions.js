import { DownClickSound } from "./components/App";
import { GameMusic } from "./components/App";

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

export const toggle_mute_audio = original_state => {
  let state = recursiveClone(original_state);
  state.mute_audio = !state.mute_audio;
  if (!state.mute_audio) DownClickSound.play();
  state.last_action = 'settings';
  return state;
}

export const toggle_mute_music = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.mute_music = !state.mute_music;
  GameMusic.volume = 0.5; 
  state.mute_music ? GameMusic.pause() : GameMusic.play();
  state.last_action = 'settings';
  state.music_enabled_once = true;
  return state;
}

export const toggle_hide_numbers = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.hide_numbers = !state.hide_numbers;
  state.last_action = 'settings';
  return state;
}

export const toggle_hide_colors = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.hide_colors = !state.hide_colors;
  state.last_action = 'settings';
  return state;
}

export const toggle_hide_tooltips = original_state => {
  let state = recursiveClone(original_state);
  if (!state.mute_audio) DownClickSound.play();
  state.hide_tooltips = !state.hide_tooltips;
  state.last_action = 'settings';
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