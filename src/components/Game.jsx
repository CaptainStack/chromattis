import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';

export const Game = ({tiles, tutorial_on, game_in_progress, current_moves, current_level_index}) => {
  tiles = tiles.map(tile => <Tile key={tile.id} tile={tile} game_in_progress={ game_in_progress }/>);
  return (
    <div className='Game' 
         style={{ 
           display: game_in_progress && !tutorial_on ? null : 'none',
           gridTemplateColumns: `repeat(${ tiles.length / Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
           gridTemplateRows: `repeat(${ Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
           gridGap: '15px' }} >
      { tiles }
    </div>
  );
}

export default Game;
