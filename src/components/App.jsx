import React, { useEffect } from 'react';
import '../styles/App.css';
import { Game } from './Game';
import { VictoryModal } from './VictoryModal';
import { Tutorial } from './Tutorial';
import { LevelNavBar } from './LevelNavBar';
import { 
  newGameButtonClicked, undoButtonClicked, cliPrintBoard, 
  tutorialButtonClicked, muteSoundButtonClicked, muteMusicButtonClicked, 
  hideNumbersButtonClicked, hideColorsButtonClicked,
} from '../events';

export const App = ({state}) => {
  // Add event listeners for custom install button/prompt
  // Logic should show button conditionally on support for PWA installation
  useEffect(() => {
    let installPrompt = null;
    const installButton = document.querySelector("#install");

    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      installPrompt = event;
      installButton.removeAttribute("hidden");
    });

    installButton.addEventListener("click", async () => {
      if (!installPrompt) {
        return;
      }
      const result = await installPrompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
      disableInAppInstallPrompt();
    });

    function disableInAppInstallPrompt() {
      installPrompt = null;
      installButton.setAttribute("hidden", "");
    }
  });

  let current_level = state.game.current_level();

  // This is the root of the React application
  return(
    <div className="App" onContextMenu={event => event.preventDefault() } >
      <div className="main-container">
        <div className='row'>
          <div className='row'><h1>Chromattis</h1><small>alpha</small></div>
          <div className='score-container'>
            <h3>MOVES:</h3> 
            <p>{current_level.moves}</p>
          </div>
          <div className='score-container'>
            <h3>BEST:</h3> 
            <p>{current_level.best_score}</p>
          </div>
          <span id="install" className='flat-button' hidden>Install ⇩</span>
        </div>
        <div className='row'>
          <p><strong>Solve by making all Tiles the same value</strong></p>
          <span id='reset_game' className='flat-button' onClick={newGameButtonClicked}>Reset ⇵</span>
          <span id="undo" className={`flat-button ${state.game.current_level().last_move ? null : 'locked'}`} onClick={undoButtonClicked}>Undo ↺</span>
          <span id="show_board" className='flat-button' onClick={cliPrintBoard} hidden>Show Board</span>
        </div>
        <LevelNavBar levels={state.game.levels} current_level_index={state.game.current_level_index} highest_unlocked_level={state.game.highest_unlocked_level()}/>
        <div className='row' id='game-row'>
          <Game hide_numbers={state.hide_numbers} hide_colors={state.hide_colors} tiles={current_level.board} show_tutorial={state.show_tutorial} game_in_progress={!current_level.in_winning_state()} current_moves={current_level.moves} current_level={current_level}/>
          <VictoryModal show_tutorial={state.show_tutorial} game_in_progress={ !current_level.in_winning_state() } current_moves={ current_level.moves } current_level_index={ state.game.current_level_index } best_score={current_level.best_score} total_levels={state.game.levels.length} />
          <Tutorial show_tutorial={state.show_tutorial} tutorial={ state.tutorial }/>
        </div>
        <p style={{fontSize:'13zpx'}}><strong onClick={tutorialButtonClicked} style={{textDecoration: 'underline', cursor:'pointer'}}>HOW TO PLAY:</strong> Tap to advance sets of Tiles to their next color. Two-finger tap or right-click to reverse them to their previous. The six colors cycle in the order red, orange, yellow, green, blue, white.</p>
        <hr />
        <div className='Settings row'>
          <strong>Settings</strong>
          <label><input onChange={muteSoundButtonClicked} type="checkbox" id="sound-toggle" />Mute sounds</label>
          <label><input onChange={muteMusicButtonClicked} defaultChecked={true} type="checkbox" id="music-toggle" />Mute music</label>
          <label><input onChange={hideNumbersButtonClicked} type="checkbox" id="numbers-toggle" />Hide numbers</label>
          <label><input onChange={hideColorsButtonClicked} type="checkbox" id="colors-toggle" />Hide colors</label>
        </div>
        <hr />
        <p style={{fontSize:'12px'}}>Created by <a href='https://captainstack.github.io/public-stackhouse' target='_'><strong>Andre Stackhouse </strong></a> (<a href='https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw&screen_name=CaptainStack&tw_p=followbutton' target='_blank'>@CaptainStack</a>).<br/>Open source code on <a href='https://github.com/CaptainStack/chromattis' target='_'><strong>GitHub</strong></a> under an MIT license.<br/><a href='https://forms.gle/YVkRv9uepXTjW46r9' target='_blank'><strong>Submit feedback here</strong></a>. <a href='https://forms.gle/rFaBNkFPJNZiF8t18' target='_blank'><strong>Report bugs</strong></a></p>
        {/* SOCIAL MEDIA BUTTONS */}
        <div className='row social'>
          <a href="https://twitter.com/share?text=Are%20you%20smart%20enough%20to%20solve%20#Chromattis%3F&via=CaptainStack" className="twitter-share-button" data-show-count="true">Tweet</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
          <div className="fb-share-button" data-href="https://captainstack.github.io/chromattis/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse">Share</a></div>
          <a href="//www.reddit.com/submit" onClick={() => { window.location = '//www.reddit.com/submit?url=' + encodeURIComponent(window.location); return false }}> <img src="//www.redditstatic.com/spreddit7.gif" alt="submit to reddit" /> </a>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="TFH72M6LQSGNG" />
            <input type="submit" className='flat-button' value="Support via PayPal" alt="PayPal - The safer, easier way to pay online!" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
