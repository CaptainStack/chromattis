import React from 'react';
import '../styles/Tile.css';
import { tileUpClicked, tileDownClicked } from '../events';

let color_map = {
  0: "#B71234",
  1: "#FF5800",
  2: "#FFD500",
  3: "#009B48",
  4: "#0046AD",
  5: "#FFFFFF",
}

export const Tile = ({tile, game_in_progress}) => 
  <div className='Tile' 
       onMouseDown={tileDownClicked(tile)}
       onMouseUp={tileUpClicked(tile)}
       onTouchStart={tileDownClicked(tile)}
       onTouchEnd={tileUpClicked(tile)}
       style={{
          backgroundColor: color_map[tile.current_color],
          transform: tile.will_change ? 'scale(0.95)' : null,
          opacity: tile.will_change ? 0.5 : 1,
          pointerEvents: !game_in_progress ? 'none' : null,
          userSelect: 'none'
        }}>
    <span style={{color: color_map[tile.current_color]}}>{tile.current_color}</span>
  </div>

export default Tile;
