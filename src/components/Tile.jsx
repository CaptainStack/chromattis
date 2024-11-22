import React from 'react';
import '../styles/Tile.css';
import { tileUpClicked, tileDownClicked, tileHovered, tileUnhovered, cliClick, cliPreview } from '../events';

let color_map = {
  0: {hex: "#B71234", string: 'Red'},
  1: {hex: "#FF5800", string: 'Orange'},
  2: {hex: "#FFD500", string: 'Yellow'},
  3: {hex: "#009B48", string: 'Green'},
  4: {hex: "#0046AD", string: 'Blue'},
  5: {hex: "#FFFFFF", string: 'White'},
}

export const Tile = ({tile, index, currently_selected, game_in_progress, hide_numbers, hide_colors, hide_tooltips}) => 
  <div className='Tile'
       onMouseDown={tileDownClicked(tile)}
       onMouseOver={tileHovered(tile)}
       onMouseLeave={tileUnhovered(tile)}
       onMouseUp={tileUpClicked(tile)}
       onTouchStart={tileDownClicked(tile)}
       onTouchEnd={tileUpClicked(tile)}
       title={hide_tooltips ? null : `Tile ${index}${hide_colors ? '': `\nColor: ${color_map[tile.current_color].string}`}${hide_numbers ? '' : `\nNumber: ${tile.current_color}`}\nWill change Tiles [${tile.target_tiles}]`}
       style={{
          backgroundColor: hide_colors ? 'silver' : color_map[tile.current_color].hex,
          outline: currently_selected ? '8px solid violet' : tile.preview ? '3px solid violet' : null,
          borderRadius: currently_selected ? '10px' : null,
          transform: tile.will_change ? 'scale(0.95)' : null,
          animation: tile.preview ? 'pulse 2s infinite' : null,
          opacity: tile.will_change ? 0.35 : tile.preview ? 0.6 : 1,
          pointerEvents: !game_in_progress ? 'none' : null,
          userSelect: 'none'
        }}>
    <span style={{color: hide_colors ? 'dimgrey' : color_map[tile.current_color].hex}}>
      {hide_numbers ? null : tile.current_color}
    </span>

    {/* HIDDEN CLI BUTTONS */}
    <span hidden id={`press_tile_${tile.id}`} onClick={cliClick(tile)}></span>
    <span hidden id={`reverse_tile_${tile.id}`} onClick={cliClick(tile, true)}></span>
    <span hidden id={`preview_tile_${tile.id}`} onClick={cliPreview(tile)}></span>
  </div>

export default Tile;
