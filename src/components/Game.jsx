import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';



export const Game = ({tiles, current_level, show_game, game_in_progress, hide_numbers, hide_colors, hide_tooltips}) => {
  tiles = tiles.map((tile, index) => 
    <Tile 
      index={index}
      key={tile.id} 
      tile={tile} 
      currently_selected={current_level.currently_selected === tile.id}
      game_in_progress={game_in_progress} 
      hide_numbers={hide_numbers} 
      hide_colors={hide_colors}
      hide_tooltips={hide_tooltips}
      />);
  return (
    <div className='Game' 
         style={{ 
            display: show_game ? null : 'none',
            gridTemplateColumns: `repeat(${ tiles.length / Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
            gridTemplateRows: `repeat(${ Math.floor(Math.sqrt(tiles.length)) }, ${ 555 / (tiles.length / Math.floor(Math.sqrt(tiles.length))) - 15 }px)`,
            gridGap: '15px' }} >
      { tiles }
    </div>
  );
}

export default Game;
