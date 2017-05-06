import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';

export const Game = ({tiles, game_in_progress}) => {
  tiles = tiles.map(tile => <Tile key={tile.id} tile={tile} game_in_progress={ game_in_progress }/>);
  let victory_modal = <div className='victory-modal'>You Win</div>
  return (
    <div className='Game' style={{
         pointerEvents: !game_in_progress ? 'none' : null}}>
      { !game_in_progress ? victory_modal : null }
      { tiles }
    </div>
  );
}
export default Game;
