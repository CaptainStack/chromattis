import React from 'react';
import '../styles/App.css';
import { Game } from './Game';
import { store } from '../index';
import { newGameButtonClicked, navigateLevelButtonClicked } from '../events';
import { VictoryModal } from './VictoryModal';

export const App = ({state}) => {
  let current_level = state.current_level();
  let level_navigation = state.levels.map((level, index) => {
    let current_level_class = state.current_level_index === index ? 'current-level' : null;
    let is_unlocked = state.highest_unlocked_level() >= index;
    let locked_class = is_unlocked ? 'unlocked' : 'locked';
    return (
      <a key={ index } 
         className={`level-navigation-button ${ current_level_class } ${ locked_class }`} 
         onClick={ is_unlocked ? navigateLevelButtonClicked(index) : null }
         title={ is_unlocked ? `Click to go to level ${index}` : 'Locked' } >
         {index}
      </a>)})

  return(
    <div className="App">
      <div className="main-container">
        <div className='row'>
          <h1>Chromattis</h1>
          <div className='score-container'>
            <h3>MOVES:</h3> 
            <p>{current_level.moves}</p>
          </div>
          <div className='score-container'>
            <h3>BEST:</h3> 
            <p>{current_level.best_score}</p>
          </div>
        </div>
        <div className='row'>
          <p>Click tiles to make the whole puzzle <strong>one color.</strong></p>
          <a className='flat-button' onClick={newGameButtonClicked}>Reset Puzzle</a>
          <a className='flat-button' onClick={ () => { store.dispatch({ type: 'SOLVE_PUZZLE' }) } } style={{ display: 'none' }}>Solve</a>
        </div>
        <div>Select Level: {level_navigation}</div>
        <Game tiles={current_level.board} game_in_progress={!current_level.in_winning_state()} current_moves={current_level.moves} current_level_index={state.current_level_index}/>
        <VictoryModal game_in_progress={ !current_level.in_winning_state() } current_moves={ current_level.moves } current_level_index={ state.current_level_index } />
        <p><strong>HOW TO PLAY:</strong> Left-click to advance tiles to the next color. Right-click to change them to their previous. There are 6 colors in total that appear in the order red, orange, yellow, green, blue, white.</p>
        <hr />
        <p>Created by <a href='https://captainstack.github.io/public-stackhouse' target='_'><strong>Andre Stackhouse </strong></a> (<a href='https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw&screen_name=CaptainStack&tw_p=followbutton'>@CaptainStack</a>). Source code hosted on <a href='https://github.com/CaptainStack/chromattis' target='_'><strong>GitHub</strong></a> under an open source MIT license.</p>
        {/* SOCIAL MEDIA BUTTONS */}
        <div className='row social'>
          <a href="https://twitter.com/share?text=Are%20you%20smart%20enough%20to%20solve%20#Chromattis%3F&via=CaptainStack" className="twitter-share-button" data-show-count="true">Tweet</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
          <div className="fb-share-button" data-href="https://captainstack.github.io/chromattis/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse">Share</a></div>
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
