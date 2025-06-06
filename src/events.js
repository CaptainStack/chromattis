import { store } from './index';
import { DownClickSound } from './initial_state';
import { UpClickSound } from './initial_state';
import { UpDownClickSound } from './initial_state';
import { sync_pulse_animations } from './actions';

let touchStartTarget = null;
let cancelPress = null;
let clickStartTarget = null;
let enterKeyCurrentlyPressed = null;

const processAchievemeNotifications = (achievements, new_achievements) => {
  if (achievements.length !== new_achievements.length) {
    store.dispatch({ type: 'UPDATE_ACHIEVEMENT_TEXT', text: new_achievements.filter(element => !achievements.includes(element))[0].text });
    document.getElementById('AchievementNotification').classList.add('show');
    document.getElementById('AchievementNotification').classList.remove('hide');
    setTimeout(() => {
      document.getElementById('AchievementNotification').classList.remove('show');
      document.getElementById('AchievementNotification').classList.add('hide');
    }, 4000);
  }
}

export const escapeKeyPressed = () => {
  if (!store.getState().mute_audio) UpDownClickSound.play();
  store.dispatch({ type: 'SELECT_TILE', tile_id: null });
}

export const backspaceKeyPressed = () => {
  const application = store.getState();
  const current_level = application.game.current_level();
  const selected_tile = current_level.board[current_level.currently_selected];
  
  if (!application.mute_audio) UpClickSound.play();
  store.dispatch({ type: 'HIGHLIGHT_TILES', tile: selected_tile });
}

export const backspaceKeyReleased = event => {
  const application = store.getState();
  const current_level = application.game.current_level();
  const achievements = application.completed_achievements();
  const selected_tile = current_level.board[current_level.currently_selected];

  if (selected_tile && !current_level.in_winning_state()) {
    if (!application.mute_audio) DownClickSound.play();
    store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: selected_tile });
    store.dispatch({ type: 'SELECT_TILE', tile_id: selected_tile.id });
    const new_achievements = application.completed_achievements();
    processAchievemeNotifications(achievements, new_achievements);
  }
  if (current_level.in_winning_state()) store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
}

export const enterKeyPressed = () => {
  const application = store.getState();
  const current_level = application.game.current_level();
  const selected_tile = current_level.board[current_level.currently_selected];
  
  enterKeyCurrentlyPressed = true;

  if (selected_tile && !current_level.in_winning_state()) {
    if (!application.mute_audio) DownClickSound.play();
    store.dispatch({ type: 'HIGHLIGHT_TILES', tile: selected_tile });
  }
}

export const enterKeyReleased = () => {
  const application = store.getState();
  const achievements = application.completed_achievements();
  const current_level = application.game.current_level();
  const selected_tile = current_level.board[current_level.currently_selected];

  enterKeyCurrentlyPressed = false;

  if (selected_tile && !current_level.in_winning_state()) {
    if (!application.mute_audio) UpClickSound.play();
    store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: selected_tile });
    store.dispatch({ type: 'SELECT_TILE', tile_id: selected_tile.id });
    const new_achievements = application.completed_achievements();
    processAchievemeNotifications(achievements, new_achievements);
  }
  if (current_level.in_winning_state()) store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
}

export const upArrowKeyPressed = event => {
  if (enterKeyCurrentlyPressed) {
    escapeKeyPressed(event);
    return;
  }

  const application = store.getState();
  const level = application.game.current_level();
  const row_length = (level.board.length / Math.floor(Math.sqrt(level.board.length)));
  const tile_id = level.currently_selected !== null ? level.currently_selected - row_length >= 0 ? level.currently_selected - row_length : level.currently_selected : level.board.length - 1;

  if (!application.mute_audio) UpClickSound.play();
  store.dispatch({ type: 'SELECT_TILE', tile_id: tile_id });
  sync_pulse_animations();
}

export const downArrowKeyPressed = event => {
  if (enterKeyCurrentlyPressed) {
    escapeKeyPressed(event);
    return;
  }

  const application = store.getState();
  const level = application.game.current_level();
  const row_length = (level.board.length / Math.floor(Math.sqrt(level.board.length)));
  const num_rows = Math.floor(Math.sqrt(level.board.length));
  const tile_id = level.currently_selected !== null ? level.currently_selected < row_length * (num_rows - 1) ? level.currently_selected + row_length : level.currently_selected : 0;
  if (!application.mute_audio) DownClickSound.play();
  store.dispatch({ type: 'SELECT_TILE', tile_id: tile_id });
  sync_pulse_animations();
}

export const rightArrowKeyPressed = event => {
  if (enterKeyCurrentlyPressed) {
    escapeKeyPressed(event);
    return;
  }

  const application = store.getState();
  const level = application.game.current_level();
  const row_length = (level.board.length / Math.floor(Math.sqrt(level.board.length)));
  const tile_id = level.currently_selected !== null ? 
    (level.currently_selected + 1) % row_length === 0 ? 
    level.currently_selected : 
    level.currently_selected + 1 : 
    0;
  if (!application.mute_audio) UpClickSound.play();
  store.dispatch({ type: 'SELECT_TILE', tile_id: tile_id });
  sync_pulse_animations();
}

export const leftArrowKeyPressed = event => {
  if (enterKeyCurrentlyPressed) {
    escapeKeyPressed(event);
    return;
  }

  const application = store.getState();
  const level = application.game.current_level();
  const row_length = (level.board.length / Math.floor(Math.sqrt(level.board.length)));
  const tile_id = level.currently_selected !== null ? 
    (level.currently_selected) % row_length === 0 ? 
    level.currently_selected : 
    level.currently_selected - 1 : 
    level.board.length - 1;
  if (!application.mute_audio) DownClickSound.play();
  store.dispatch({ type: 'SELECT_TILE', tile_id: tile_id });
  sync_pulse_animations();
}

export const cliPrintBoard = () => {
  const game = store.getState().game;
  const level = game.current_level();
  const board = level.board;
  console.log(`LEVEL ${game.current_level_index}, MOVE ${level.moves}`);
  const columns = board.length / Math.floor(Math.sqrt(board.length));

  let row = '[ ';
  for (let index = 0; index < board.length; index++) {
    if (index % columns === 0 && index > 0) {
      row += ']\n[ ';
    }
    row += board[index].current_color + ' ';
  }
  row += ']';
  console.log(row);
}

export const cliClick = (tile, reverse) => () => {
  const application = store.getState();
  const current_level = application.game.current_level();
  if (!current_level.in_winning_state()) {
    if (!application.mute_audio) UpDownClickSound.play();
    reverse ? 
      store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: tile }) : 
      store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: tile });
    cliPrintBoard();
  } else {
    console.log(`This level is currently solved. \nSelect a new level using the next_level(), previous_level(), or goto_level(index) commands. \nReset the puzzle using the shuffle() command.`);
  }
}

export const cliPreview = (tile) => () => {
  if (!store.getState().game.current_level().in_winning_state()) {
    store.dispatch({ type: 'SELECT_TILE', tile_id: tile ? tile.id : null });
    console.log(`If you press Tile ${tile.id} the following Tiles will change:`);
    console.log(tile.target_tiles);
  } else {
    console.log('This level is currently solved. Select a new level, or reset the puzzle using the shuffle() command.');
  }
}

export const tileTouchStart = tile => event => {
  const application = store.getState();
  if (!application.mute_audio) DownClickSound.play();
  touchStartTarget = event.target
  store.dispatch({type: 'TOUCH_STARTED', value: true});
  store.dispatch({ type: 'SELECT_TILE', tile_id: tile.id });
}

export const tileTouchEnd = tile => event => {
  const application = store.getState();
  const achievements = application.completed_achievements();
  const touch = event.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  let touchEndTarget = document.elementFromPoint(x, y);document.elementFromPoint(x, y);

  const current_level = application.game.current_level();
  const selected_tile = current_level.board[current_level.currently_selected];
  
  if (selected_tile && !current_level.in_winning_state() && touchStartTarget === touchEndTarget && !cancelPress) {
    if (!application.mute_audio) UpClickSound.play();
    if ((event.touches && event.touches.length === 1)) {
      store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: tile });  
    } else {
      store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: tile });
    }
    touchStartTarget = null;
  }
  store.dispatch({ type: 'SELECT_TILE', tile_id: null });
  store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });

  cancelPress = null;
  const new_achievements = application.completed_achievements();
  processAchievemeNotifications(achievements, new_achievements);
}

export const tileUpClicked = (clicked_tile) => event => {
  let clickEndTarget = event.target;
  const application = store.getState();
  const achievements = application.completed_achievements();
  
  // Suppress click actions triggered by touch events, set touch_action flag to track
  if (application.touch_action) {
    store.dispatch({type: 'TOUCH_STARTED', value: false});
    return;
  } 
  if (clickStartTarget !== clickEndTarget) {
    return;
  }

  if (event.button === 0) {
    if (!application.mute_audio) UpClickSound.play();
    console.log(`Press Tile ${clicked_tile.id}`);
    store.dispatch({ type: 'ADVANCE_TILE_COLOR', tile: clicked_tile });
  }
  else if (event.button === 2) {
    if (!application.mute_audio) UpClickSound.play();
    console.log(`Reverse press Tile ${clicked_tile.id}`);
    store.dispatch({ type: 'PREVIOUS_TILE_COLOR', tile: clicked_tile });
  }
  cliPrintBoard();

  const new_achievements = application.completed_achievements();
  processAchievemeNotifications(achievements, new_achievements);
}

export const tileDownClicked = (clicked_tile) => event => {
  clickStartTarget = event.target;
  const application = store.getState();
  if (!application.touch_action) {
    if (!application.mute_audio && (event.button === 0 || (event.touches))) DownClickSound.play();
    store.dispatch({ type: 'HIGHLIGHT_TILES', tile: clicked_tile });
  }
}

export const tileHovered = hovered_tile => () => {
  if (!store.getState().touch_action) {
    store.dispatch({ type: 'PREVIEW_TILES', tile: hovered_tile });
  }
  sync_pulse_animations();
}

export const muteMusicButtonClicked = () => {
  const application = store.getState();
  const achievements = application.completed_achievements();

  store.dispatch({ type: 'TOGGLE_MUTE_MUSIC' });

  const new_achievements = application.completed_achievements();
  processAchievemeNotifications(achievements, new_achievements);
}

export const tileUnhovered = hovered_tile => () => {
  if (!store.getState().touch_action) {
    store.dispatch({ type: 'CLEAR_HIGHLIGHTS' });
  }
  sync_pulse_animations();
}

export const tileLongPressed = () => () => cancelPress = true;
export const undoButtonClicked = () => store.dispatch({ type: 'UNDO_MOVE' });
export const nextTutorialButtonClicked = () => store.dispatch({ type: 'NEXT_TUTORIAL' });
export const previousTutorialButtonClicked = () => store.dispatch({ type: 'PREVIOUS_TUTORIAL' });
export const tutorialButtonClicked = () => store.dispatch({ type: 'TOGGLE_TUTORIAL' });
export const achievementsButtonClicked = () => store.dispatch({ type: 'TOGGLE_ACHIEVEMENTS' });
export const muteSoundButtonClicked = () => store.dispatch({ type: 'TOGGLE_MUTE_SOUND' });
export const hideNumbersButtonClicked = () => store.dispatch({ type: 'TOGGLE_HIDE_NUMBERS' });
export const hideColorsButtonClicked = () => store.dispatch({ type: 'TOGGLE_HIDE_COLORS' });
export const nextLevelSelectPageClicked = () => store.dispatch({ type: 'NEXT_LEVEL_NAVIGATION_PAGE' });
export const previousLevelSelectPageClicked = () => store.dispatch({ type: 'PREVIOUS_LEVEL_NAVIGATION_PAGE' });
export const toggleLevelNavMenu = () => store.dispatch({ type: 'TOGGLE_LEVEL_NAVIGATION_MENU' });
export const toggleHideTooltips = () => store.dispatch({ type: 'TOGGLE_HIDE_TOOLTIPS' });
export const nullLastActionOnInitialPageLoad = () => store.dispatch({ type: 'NULL_LAST_ACTION' });

export const newGameButtonClicked = () => {
  console.log('Shuffling board...');
  const interval = setInterval(() => {
    if (!store.getState().mute_audio) DownClickSound.play();
    store.dispatch({ type: 'SHUFFLE_COLORS' });
  }, 50);
  setTimeout(() => { clearInterval(interval); cliPrintBoard(); }, 800);
  sync_pulse_animations();
}

export const navigateLevelButtonClicked = level_index => () => {
  const game = store.getState().game;
  if (level_index <= game.highest_unlocked_level()) {
    store.dispatch({ type: 'NAVIGATE_LEVEL', level: level_index });
    console.log(`Switching to Level ${level_index}...`);
    setTimeout(() => {cliPrintBoard()}, 500);
  } else {
    console.log(`You haven't unlocked Level ${level_index} yet.`);
  }
  
  const current_level = game.current_level();

  if (current_level.in_winning_state() && current_level.best_score === 'N/A') {
    store.dispatch({ type: 'SHUFFLE_COLORS' });
  }
}
