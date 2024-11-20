import React from 'react';
import '../styles/LevelNavBar.css';
import { LevelNavButton } from './LevelNavButton';
import { toggleLevelNavMenu } from '../events';

export const LevelNavBar = ({levels, current_level_index, highest_unlocked_level}) => {

  let buttons = levels.map((level, index) => {

    let current_level_class = current_level_index === index ? 'current-level' : null;
    let is_unlocked = highest_unlocked_level >= index;
    let locked_class = is_unlocked ? 'unlocked' : 'locked';

    // The LevelNavBar should always display 10 levels and attempt to place the current level in the center
    let nav_levels_highest = current_level_index + 6 < 10 ? 10 : current_level_index + 6;
    let nav_levels_lowest = current_level_index - 5 < levels.length - 11 ? current_level_index - 5 : levels.length - 11;

    return (<LevelNavButton display_in_nav_bar={index > nav_levels_lowest && index < nav_levels_highest} key={`${level.id}-NavButton`} level={level} index={index} current_level_index={current_level_index} locked_class={locked_class} current_level_class={current_level_class}/>)
  })

  return(<p className='LevelNavBar' style={{fontSize:'24px'}}><strong onClick={toggleLevelNavMenu} style={{textDecoration: 'underline', cursor:'pointer'}}>SELECT LEVEL</strong>{buttons}</p>);
}

export default LevelNavBar;
