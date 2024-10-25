import React from 'react';
import '../styles/LevelNavigation.css';
import { navigateLevelButtonClicked } from '../events';

export const LevelNavigation = ({levels, current_level_index, highest_unlocked_level}) => {

  let buttons = levels.map((level, index) => {

    let current_level_class = current_level_index === index ? 'current-level' : null;
    let is_unlocked = highest_unlocked_level >= index;
    let locked_class = is_unlocked ? 'unlocked' : 'locked';

    return (
      <span key={ index } 
         className={`level-navigation-button ${ current_level_class } ${ locked_class }`} 
         onClick={ is_unlocked ? navigateLevelButtonClicked(index) : null }
         title={ is_unlocked ? `Click to go to level ${index}` : 'Locked' } >
         {index}
      </span>
    )
  })

  return(<div className='LevelNavigation'>Select Level: {buttons}</div>);
}

export default LevelNavigation;
