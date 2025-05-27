import '../styles/Tile.css';
import { tileUpClicked, tileDownClicked, tileHovered, tileUnhovered, cliClick, cliPreview, tileTouchStart, tileTouchEnd, tileLongPressed } from '../events';

const color_map = {
  0: {hex: '#B71234', string: 'Red'},
  1: {hex: '#FF5800', string: 'Orange'},
  2: {hex: '#FFD500', string: 'Yellow'},
  3: {hex: '#009B48', string: 'Green'},
  4: {hex: '#0046AD', string: 'Blue'},
  5: {hex: '#FFFFFF', string: 'White'},
};

export const Tile = ({tile, index, currently_selected, preview_mode, game_in_progress, hide_numbers, hide_colors, hide_tooltips}) => 
  <div className='Tile'
       onMouseDown={tileDownClicked(tile)}
       onMouseEnter={tileHovered(tile)}
       onMouseLeave={tileUnhovered(tile)}
       onMouseUp={tileUpClicked(tile)}
       onTouchStart={tileTouchStart(tile)}
       onTouchEnd={tileTouchEnd(tile)}
       onContextMenu={tileLongPressed(tile)}
       title={hide_tooltips ? null : `Tile ${index}${hide_colors ? '': `\nColor: ${color_map[tile.current_color].string}`}${hide_numbers ? '' : `\nNumber: ${tile.current_color}`}\nWill change Tiles [${tile.target_tiles.sort((a, b) => a - b)}]`}
       style={{
          backgroundColor: hide_colors ? 'silver' : color_map[tile.current_color].hex,
          outline: currently_selected ? '0.4rem solid Aqua' : tile.preview || tile.will_change ? '0.2rem dashed Aqua' : null,
          borderRadius: currently_selected ? '1rem' : null,
          transform: tile.will_change ? 'scale(1.03)' : null,
          animation: tile.preview ? 'pulse 1s infinite' : null,
          opacity: tile.will_change ? 1 : tile.preview || !preview_mode ? 1 : 0.6,
          pointerEvents: !game_in_progress ? 'none' : null,
        }}>
    <span style={{
      color: hide_colors ? 'dimgrey' : currently_selected ? 'Aqua' : color_map[tile.current_color].hex,
      fontWeight: currently_selected ? 'bold' : null,
    }}>
      { hide_numbers ? null : game_in_progress ? tile.current_color : null }
      { !game_in_progress ? '✓' : '' }
    </span>

    {/* HIDDEN CLI BUTTONS */}
    <span hidden id={`press_tile_${tile.id}`} onClick={cliClick(tile)}></span>
    <span hidden id={`reverse_tile_${tile.id}`} onClick={cliClick(tile, true)}></span>
    <span hidden id={`preview_tile_${tile.id}`} onClick={cliPreview(tile)}></span>
  </div>

export default Tile;
