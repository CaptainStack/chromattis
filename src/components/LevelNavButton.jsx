import React from 'react';
import { navigateLevelButtonClicked } from '../events';

export const LevelNavButton = ({display_in_nav_menu, display_in_nav_bar, index, current_level_class, is_unlocked, locked_class}) => {
  return (
    <span
        className={`level-navigation-button ${ current_level_class } ${ locked_class } ${display_in_nav_bar ? 'in-nav' : 'hide-in-nav'} ${display_in_nav_menu ? 'in-menu' : 'hide-in-menu'}`} 
        onClick={ navigateLevelButtonClicked(index) }
        title={ is_unlocked ? `Click to go to level ${index}` : 'Locked' } >
        {index}
    </span>
  )
}

export default LevelNavButton;
