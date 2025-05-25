import { useEffect } from 'react';
import '../styles/App.css';
import { Game } from './Game';
import { VictoryModal } from './VictoryModal';
import { Achievements } from './Achievements';
import { AchievementNotification } from './AchievementNotification';
import { Tutorial } from './Tutorial';
import { LevelNavBar } from './LevelNavBar';
import { LevelNavMenu } from './LevelNavMenu';
import { DownClickSound, VictorySound, all_tracks } from '../initial_state';
import { 
  newGameButtonClicked, undoButtonClicked, tutorialButtonClicked, 
  muteSoundButtonClicked, muteMusicButtonClicked, hideNumbersButtonClicked, 
  hideColorsButtonClicked, toggleHideTooltips, nullLastActionOnInitialPageLoad, 
  rightArrowKeyPressed, leftArrowKeyPressed, enterKeyPressed, 
  backspaceKeyPressed, escapeKeyPressed, upArrowKeyPressed, 
  downArrowKeyPressed, achievementsButtonClicked
} from '../events';

let playlist = all_tracks.slice();

// Get random song and remove it from the playlist
let random_track = Math.floor(Math.random() * playlist.length);
let track = playlist[random_track];
playlist = playlist.slice(0, random_track).concat(all_tracks.slice(random_track + 1));
export const GameMusic = new Audio(track);

// Add event listener for end of track - play the next track and advance the buffer
GameMusic.addEventListener('ended', () => {
  if (playlist.length === 0) {
    playlist = all_tracks.slice();
  }

  while (GameMusic.src.includes(track)) {
    random_track = Math.floor(Math.random() * playlist.length);
    track = playlist[random_track];
  }

  playlist = playlist.slice(0, random_track).concat(playlist.slice(random_track + 1));

  const temp = new Audio(track);
  GameMusic.src = temp.src;
  GameMusic.play();
});


export const App = ({state}) => {
  // Add event listeners for custom install button/prompt
  // Logic should show button conditionally on support for PWA installation
  // Will only run on first render because of empty array passed as second param
  useEffect(() => {
    // Set last_action to null to suppress victory sound on first load (should only play after a user action)
    nullLastActionOnInitialPageLoad();
    let installPrompt = null;
    const installButton = document.querySelector('#install');
    const iOSinstallButton = document.querySelector('#iOSinstall');
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    const isIos = /macintosh|ipad|iphone|ipod/.test(userAgent) && !window.MSStream;

    if (isIos && isSafari) {
      iOSinstallButton.hidden = false;
    }

    window.addEventListener('beforeinstallprompt', event => {
      installPrompt = event;
      installButton.hidden = false;
    });

    installButton.addEventListener('click', async () => {
      if (!state.mute_audio) DownClickSound.play();
      if (!installPrompt) return;
      const result = await installPrompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
      disableInAppInstallPrompt();
    });

    const disableInAppInstallPrompt = () => {
      installPrompt = null;
      installButton.hidden = true;
    }

    const keyboardControls = event => {
      switch(event.key) {
        case 'ArrowLeft': leftArrowKeyPressed(); event.preventDefault(); break;
        case 'ArrowRight': rightArrowKeyPressed(); event.preventDefault(); break;
        case 'ArrowUp': upArrowKeyPressed(); event.preventDefault(); break;
        case 'ArrowDown': downArrowKeyPressed(); event.preventDefault(); break;
        case 'Enter': enterKeyPressed(); break;
        case 'Backspace': backspaceKeyPressed(); break;
        case 'Escape': escapeKeyPressed(); break;
        case 'r': newGameButtonClicked(); break;
        case 't': tutorialButtonClicked(); break;
        case 'u': undoButtonClicked(); break;
        case 'a': achievementsButtonClicked(); break;
        case 'm': document.getElementById('music_toggle').click(); break;
        case 's': document.getElementById('sound_toggle').click(); break;
        case 'n': document.getElementById('numbers_toggle').click(); break;
        case 'c': document.getElementById('colors_toggle').click(); break;
        case 'i': document.getElementById('tooltips_toggle').click(); break;
        case '=': document.getElementById('next_puzzle_button').click(); break;
        case '-': document.getElementById('previous_puzzle_button').click(); break;
        case '[': document.getElementById('previous_tutorial_button').click(); break;
        case ']': document.getElementById('next_tutorial_button').click(); break;
        case '~': localStorage.clear(); window.location.reload(); break;
        default: break;
      }
    }

    document.addEventListener('keydown', keyboardControls);

    let connectedGamepads = {};
    let isPolling = true;

    const stopPolling = () => {
      isPolling = false;
    }
    window.addEventListener('gamepadconnected', event => {
      const gamepad = event.gamepad;
      console.log(`Gamepad connected at index ${gamepad.index}: ${gamepad.id}. ${gamepad.buttons.length} buttons, ${gamepad.axes.length} axes.`);
      gamepadConnectedHandler(event.gamepad);
    });

    window.addEventListener('gamepaddisconnected', event => {
      console.log('Gamepad disconnected:', event.gamepad);
      gamepadDisconnectedHandler(event.gamepad);
    });

    const gamepadConnectedHandler = gamepad => {
      connectedGamepads[gamepad.index] = gamepad;
      console.log('Connected gamepads:', connectedGamepads);
      // You might want to start polling for button/axis updates here
      // Start the polling loop
      requestAnimationFrame(updateGamepadState);
    }

    const gamepadDisconnectedHandler = gamepad => {
      delete connectedGamepads[gamepad.index];
      console.log('Connected gamepads:', connectedGamepads);
      // You might want to stop polling for this gamepad here
      stopPolling();
    }

    const gamepadControls = buttonIndex => {
      switch(buttonIndex) {
        case 14: leftArrowKeyPressed(); break;
        case 15: rightArrowKeyPressed(); break;
        case 12: upArrowKeyPressed(); break;
        case 13: downArrowKeyPressed(); break;
        case 0: enterKeyPressed(); break;
        case 1: backspaceKeyPressed(); break;
        case 9: tutorialButtonClicked(); break;
        case 2: newGameButtonClicked(); break;
        case 8: escapeKeyPressed(); break;
        case 3: undoButtonClicked(); break;
        case 5: document.getElementById('next_puzzle_button').click(); break;
        case 4: document.getElementById('previous_puzzle_button').click(); break;
        default: break;
      }
    }

    let previousButtonStates = {};
    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();

      for (const gamepad of gamepads) {
        if (gamepad) {
          const gamepadIndex = gamepad.index;
          if (!previousButtonStates[gamepadIndex]) {
            previousButtonStates[gamepadIndex] = {};
          }
          // Process button presses
          gamepad.buttons.forEach((button, index) => {
            const wasPressed = previousButtonStates[gamepadIndex][index] ? previousButtonStates[gamepadIndex][index].pressed : false;
            const isPressed = button.pressed;
            if (isPressed && !wasPressed) {
              // Button is currently pressed
              // You might want to check for specific button indices
              gamepadControls(index);
            }
            previousButtonStates[gamepadIndex][index] = { pressed: isPressed, value: button.value };
          });
        }
      }
      // Request the next frame to continue polling
      if (isPolling) requestAnimationFrame(updateGamepadState);
    }

    return () => document.removeEventListener('keydown', keyboardControls);
  }, [state.mute_audio]);

  const current_level = state.game.current_level();

  // This is the root of the React application
  return(
    <div className='App' onContextMenu={event => event.preventDefault() } >
      <div className='main-container'>
        <div className='first'>
          <AchievementNotification state={state} show={state.show_achievement_notification}/>
          <div className='row'>
            <div className='row'><h1>Chromattis</h1><small>alpha</small></div>
            <div className='score-container'>
              <h3>MOVES</h3> 
              <p>{current_level.moves}</p>
            </div>
            <div className='score-container'>
              <h3>BEST</h3>
              <p>{current_level.best_score}</p>
            </div>
            <div className='score-container achievements' onClick={achievementsButtonClicked}>
              <h3>ACHIEVEMENTS</h3>
              <p>🏆</p>
            </div>
          </div>

          <div className='row'>
            <h3 className='goal'><strong>Make all Tiles the same value</strong></h3>
            <span id='reset_game' title='Click to reset the puzzle [r]' className='flat-button' onClick={newGameButtonClicked}>Reset ⇵</span>
            <span id='undo' title='Click to undo last move [u]' className={`flat-button ${state.game.current_level().last_move ? null : 'locked'}`} onClick={undoButtonClicked}>Undo ↺</span>
            <span id='install' title='Click to install Chromattis' className='flat-button' hidden>Install ↓</span>
            <span id='iOSinstall' title='Click to install Chromattis' className='flat-button' hidden onClick={() => alert('Click the Share button next to your browser bar and select "Add to Homescreen" to install Chromattis.\n\nInstalling Chromattis is optional and gives you offline access, saves your progress, and provides a more native "app" like experience.')}>Install ↓</span>
          </div>

          <LevelNavBar hide_tooltips={state.hide_tooltips} levels={state.game.levels} current_level_index={state.game.current_level_index} highest_unlocked_level={state.game.highest_unlocked_level()}/>
        </div>

        <div className='second'>
          <div className='row' id='game-row'>
            <Game hide_tooltips={state.hide_tooltips} hide_numbers={state.hide_numbers} hide_colors={state.hide_colors} tiles={current_level.board} game_in_progress={!current_level.in_winning_state()} current_moves={current_level.moves} current_level={current_level}/>
            <VictoryModal mute_audio={state.mute_audio} victory_audio={VictorySound} last_action={state.last_action} show_victory={state.current_display === 'game' && current_level.in_winning_state()} current_moves={ current_level.moves } current_level_index={ state.game.current_level_index } best_score={current_level.best_score} total_levels={state.game.levels.length}/>
            <Achievements state={state} achievements={state.achievements} show_achievements={state.current_display === 'achievements'}/>
            <Tutorial show_tutorial={state.current_display === 'tutorial'} tutorial={ state.tutorial }/>
            <LevelNavMenu hide_tooltips={state.hide_tooltips} page={state.level_nav_page} show_level_nav={state.current_display === 'nav'} levels={state.game.levels} current_level_index={state.game.current_level_index} highest_unlocked_level={state.game.highest_unlocked_level()}/>
          </div>
        </div>

        <div className='third'>
          <p className='instructions' onClick={tutorialButtonClicked} title={state.hide_tooltips ? null : 'Open tutorial [t]'}><strong style={{textDecoration: 'underline', cursor:'pointer'}}>OPEN TUTORIAL</strong> Tap to advance sets of Tiles to their next color. Two-finger tap or right-click to reverse them to their previous. The six colors cycle in the order red, orange, yellow, green, blue, white.</p>

          <hr/>

          <div className='Settings row'>
            <strong>Settings</strong>
            <label title='Toggle sound effects [s]'><input id='sound_toggle' onChange={muteSoundButtonClicked} defaultChecked={state.mute_audio} type='checkbox'/>Sounds off</label>
            <label title='Toggle music [m]'><input id='music_toggle' onChange={muteMusicButtonClicked} defaultChecked={state.mute_music} type='checkbox'/>Music off</label>
            <label title='Enable/disable numbers on tiles [n]'><input id='numbers_toggle' onChange={hideNumbersButtonClicked} defaultChecked={state.hide_numbers} type='checkbox'/>Numbers off</label>
            <label title='Enable/disable colors on tiles [c]'><input id='colors_toggle' onChange={hideColorsButtonClicked} defaultChecked={state.hide_colors} type='checkbox'/>Colors off</label>
            {window.matchMedia('(pointer:fine)').matches ? <label title='Enable/disable info tooltips on tiles [i]'><input id='tooltips_toggle' onChange={toggleHideTooltips} defaultChecked={state.hide_tooltips} type='checkbox'/>Tooltips off</label> : null}
          </div>

          <hr/>

          <small>
            Created by <a href='//captainstack.github.io/public-stackhouse' target='_blank' rel='noreferrer'><strong>Andre Stackhouse </strong></a> (<a href='//twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw&screen_name=CaptainStack&tw_p=followbutton' target='_blank' rel='noreferrer'>@CaptainStack</a>)<br/>
            Open source code on <a href='//github.com/CaptainStack/chromattis' target='_blank' rel='noreferrer'><strong>GitHub</strong></a> under an <a href='//github.com/CaptainStack/chromattis/blob/master/LICENSE' target='_blank' rel='noreferrer'><strong>MIT license</strong></a><br/>
            Public domain music courtesy <a href='//opengameart.org' target='_blank' rel='noreferrer'><strong>OpenGameArt.org</strong></a><br/>
            <a href='//forms.gle/YVkRv9uepXTjW46r9' target='_blank' rel='noreferrer'><strong>Submit feedback</strong></a>&nbsp;&nbsp;<a href='//forms.gle/rFaBNkFPJNZiF8t18' target='_blank' rel='noreferrer'><strong>Report bugs</strong></a>
          </small>

          {/* SOCIAL MEDIA BUTTONS */}
          <div className='row social'>
            <a className='social-share' href={`//twitter.com/share?text=${encodeURIComponent('Are you smart enough to solve #Chromattis? A new puzzle game by Andre Stackhouse (@CaptainStack).\n\n Play for free here:\n')}`} data-show-count='true' target='_blank' rel='noreferrer'><img src={`${import.meta.env.BASE_URL}x.png`} alt='Post on X'/></a>
            <a className='social-share' href='//facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse' target='_blank' rel='noreferrer'><img src={`${import.meta.env.BASE_URL}facebook.png`} alt='Share on Facebook'/></a>
            <a className='social-share' href={`//reddit.com/submit?url=${encodeURIComponent(window.location)}&title=${encodeURIComponent('Just discovered a new puzzle game called Chromattis. It\'s challenging but very fun (and free)!')}`} target='_blank' rel='noreferrer'> <img src={`${import.meta.env.BASE_URL}reddit.png`} alt='submit to reddit'/></a>
            <a className='flat-button' href='//opencollective.com/public-stackhouse/projects/chromattis/donate?interval=month&amount=10&contributeAs=me' target='_blank' rel='noreferrer'>Support on Open Collective</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
