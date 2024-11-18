import React from 'react';
import '../styles/VictoryModal.css';
import { newGameButtonClicked, navigateLevelButtonClicked } from '../events';

export const VictoryModal = ({show_tutorial, game_in_progress, current_moves, current_level_index, best_score, total_levels}) =>
  <div className='VictoryModal bounce-container' style={{ display: game_in_progress || show_tutorial ? 'none' : null }}>
    <div style={{visibility: current_moves <= best_score ? null : 'hidden'}}>
      <h2 className='bounce'>
        <span>H</span>
        <span>I</span>
        <span>G</span>
        <span>H</span>
        <span>&nbsp;</span>
        <span>S</span>
        <span>C</span>
        <span>O</span>
        <span>R</span>
        <span>E</span>
        <span>!</span>
      </h2>
    </div>
    <h1>You solved Level {current_level_index} in <br /> {current_moves} moves!</h1>
    <p>Try to do it in fewer or move on?</p>
    <div className='row'>
      <span id='previous_puzzle_button' className={`flat-button ${current_level_index > 0 ? null : 'locked'}`} onClick={ navigateLevelButtonClicked(current_level_index > 0 ? current_level_index - 1 : current_level_index) }>Previous Puzzle</span>
      <span className='flat-button' onClick={ newGameButtonClicked }>Reset Puzzle</span>
      <span id='next_puzzle_button' className={`flat-button ${current_level_index < total_levels - 1 ? null : 'locked'}`} onClick={ navigateLevelButtonClicked(current_level_index < total_levels ? current_level_index + 1 : current_level_index) }>Next Puzzle</span>
    </div>
    <p>Brag about it:</p>
    <div className='row victory-share' style={{ display: game_in_progress ? 'none' : null }}>
      <a href={`https://twitter.com/share?text=I%20beat%20#Chromattis%20in%20${current_moves}%20moves.%20I%20bet%20you%20can't%20do%20it%20in%20fewer!&via=CaptainStack`} className="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <span className="fb-share-button" data-href="https://captainstack.github.io/chromattis/" data-layout="button_count" data-size="small" data-mobile-iframe="true">
        <a className="fb-xfbml-parse-ignore" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse">
          Share
        </a>
      </span>
      <a href="//www.reddit.com/submit" onClick={() => { window.location = '//www.reddit.com/submit?url=' + encodeURIComponent(window.location); return false }}> 
        <img src="//www.redditstatic.com/spreddit7.gif" alt="submit to reddit" />
      </a>
    </div>
  </div>

export default VictoryModal;
