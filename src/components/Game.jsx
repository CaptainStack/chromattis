import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';
import { newGameButtonClicked } from '../events';

export const Game = ({tiles, game_in_progress, current_moves}) => {
  tiles = tiles.map(tile => <Tile key={tile.id} tile={tile} game_in_progress={ game_in_progress }/>);
  let victory_modal = 
    <div className='victory-modal' style={{ visibility: game_in_progress ? 'hidden' : null }}>
      <h1>You won in {current_moves} moves!</h1>
      <p>Try to do it in fewer?</p>
      <a className='flat-button' onClick={ newGameButtonClicked }>New Game</a>
      <p>Brag about it:</p>
      <div className='row victory-share' style={{ display: game_in_progress ? 'none' : null }}>
        <a href={`https://twitter.com/share?text=I%20beat%20#Chromattis%20in%20${current_moves}%20moves.%20I%20bet%20you%20can't%20do%20it%20in%20fewer!&via=CaptainStack`} className="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
        <span className="fb-share-button" data-href="https://captainstack.github.io/chromattis/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse">Share</a></span>
        <a href="//www.reddit.com/submit" onClick={() => { window.location = '//www.reddit.com/submit?url=' + encodeURIComponent(window.location); return false }}> <img src="//www.redditstatic.com/spreddit7.gif" alt="submit to reddit" /> </a>
      </div>
    </div>
  return (
    <div className='Game' onContextMenu={(event) => event.preventDefault() } >
      { victory_modal }
      { tiles }
    </div>
  );
}

export default Game;
