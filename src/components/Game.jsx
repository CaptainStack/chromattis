import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';

export const Game = ({tiles, show_tutorial, game_in_progress, hide_numbers, hide_colors, current_moves, current_level_index}) => {
  tiles = tiles.map(tile => <Tile key={tile.id} tile={tile} game_in_progress={ game_in_progress } hide_numbers={ hide_numbers } hide_colors={ hide_colors }/>);
  return (
    <div className='Game' 
         style={{ 
           display: game_in_progress && !show_tutorial ? null : 'none',
           gridTemplateColumns: `repeat(${ tiles.length / Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
           gridTemplateRows: `repeat(${ Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
           gridGap: '15px' }} >
      { tiles }
    </div>
  );
}

export default Game;
