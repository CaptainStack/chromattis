import React from 'react';
import { Tile } from './Tile';
import '../styles/Game.css';

export const Game = ({tiles}) => {
  tiles = tiles.map(tile => <Tile tile={tile} />);
  return (
    <div className='Game'>
      {tiles}
    </div>
  );
}
export default Game;
