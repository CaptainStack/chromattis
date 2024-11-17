import React from 'react';
import '../styles/LevelNavBar.css';
import { LevelNavButton } from './LevelNavButton';

export const LevelNavBar = ({levels, current_level_index, highest_unlocked_level}) => {

  let buttons = levels.map((level, index) => {

    let current_level_class = current_level_index === index ? 'current-level' : null;
    let is_unlocked = highest_unlocked_level >= index;
    let locked_class = is_unlocked ? 'unlocked' : 'locked';

    return (<LevelNavButton key={`${level.id}-NavButton`} level={level} index={index} current_level_index={current_level_index} locked_class={locked_class} current_level_class={current_level_class}/>
    )
  })

  return(<div className='LevelNavBar'>Select Level: {buttons}</div>);
}

export default LevelNavBar;
