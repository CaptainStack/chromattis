import React from 'react';
import '../styles/Tile.css';
import { tileClicked } from '../events';

let color_map = {
  0: "#B71234",
  1: "#FF5800",
  2: "#FFD500",
  3: "#009B48",
  4: "#0046AD",
  5: "#FFFFFF",
}

export const Tile = ({tile}) => 
  <div className='Tile' 
       key={tile.id} 
       onClick={tileClicked(tile)} 
       style={{backgroundColor: color_map[tile.color_sequence[tile.current_color]]}}>
  </div>

export default Tile;
