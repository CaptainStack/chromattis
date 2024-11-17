import React from 'react';
import { navigateLevelButtonClicked } from '../events';

export const LevelNavButton = ({index, current_level_class, is_unlocked, locked_class}) => {
  return (
    <span 
        className={`level-navigation-button ${ current_level_class } ${ locked_class }`} 
        onClick={ navigateLevelButtonClicked(index) }
        title={ is_unlocked ? `Click to go to level ${index}` : 'Locked' } >
        {index}
    </span>
  )
}

export default LevelNavButton;
