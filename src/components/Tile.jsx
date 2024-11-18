import React from 'react';
import '../styles/Tile.css';
import { tileUpClicked, tileDownClicked, tileHovered, tileUnhovered, cliClick, cliPreview } from '../events';

let color_map = {
  0: "#B71234",
  1: "#FF5800",
  2: "#FFD500",
  3: "#009B48",
  4: "#0046AD",
  5: "#FFFFFF",
}

export const Tile = ({tile, game_in_progress, hide_numbers, hide_colors, upclick_audio, downclick_audio, updownclick_audio}) => 
  <div className='Tile'
       onMouseOver={tileHovered(tile)}
       onMouseLeave={tileUnhovered(tile)}
       onMouseUp={tileUpClicked(tile, upclick_audio)}
       onPointerDown={tileDownClicked(tile, downclick_audio)}
       onTouchEnd={tileUpClicked(tile, upclick_audio)}
       style={{
          backgroundColor: hide_colors ? 'silver' : color_map[tile.current_color],
          border: tile.preview ? '5px solid #8f7a66' : null,
          transform: tile.will_change ? 'scale(0.95)' : null,
          animation: tile.preview ? 'pulse 2s infinite' : null,
          opacity: tile.will_change ? 0.25 : tile.preview ? 0.5 : 1,
          pointerEvents: !game_in_progress ? 'none' : null,
          userSelect: 'none'
        }}>
    <span style={{color: hide_colors ? 'dimgrey' : color_map[tile.current_color]}}>
      {hide_numbers ? null : tile.current_color}
    </span>

    {/* HIDDEN CLI BUTTONS */}
    <span hidden id={`press_tile_${tile.id}`} onClick={cliClick(tile)}></span>
    <span hidden id={`reverse_tile_${tile.id}`} onClick={cliClick(tile, true)}></span>
    <span hidden id={`preview_tile_${tile.id}`} onClick={cliPreview(tile)}></span>
  </div>

export default Tile;
