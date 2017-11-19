import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';

export const Game = ({tiles, game_in_progress, current_moves, current_level_index}) => {
  tiles = tiles.map(tile => <Tile key={tile.id} tile={tile} game_in_progress={ game_in_progress }/>);
  return (
    <div className='Game' onContextMenu={event => event.preventDefault() } style={{ display: game_in_progress ? null : 'none' }} >
      { tiles }
    </div>
  );
}

export default Game;
