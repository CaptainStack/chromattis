import '../styles/LevelNavBar.css';
import { LevelNavButton } from './LevelNavButton';
import { toggleLevelNavMenu } from '../events';

export const LevelNavBar = ({levels, current_level_index, highest_unlocked_level, hide_tooltips}) => {

  let buttons = levels.map((level, index) => {

    let current_level_class = current_level_index === index ? 'current-level' : null;
    let is_unlocked = highest_unlocked_level >= index;

    // The LevelNavBar should always display 10 levels and attempt to place the current level in the center
    let nav_levels_highest = current_level_index + 6 < 10 ? 10 : current_level_index + 6;
    let nav_levels_lowest = current_level_index - 5 < levels.length - 11 ? current_level_index - 5 : levels.length - 11;

    return (<LevelNavButton hide_tooltips={hide_tooltips} display_in_nav_bar={index > nav_levels_lowest && index < nav_levels_highest} key={`${level.id}-NavButton`} level={level} index={index} current_level_index={current_level_index} is_unlocked={is_unlocked} current_level_class={current_level_class}/>)
  })

  return(<p className='LevelNavBar' title={hide_tooltips ? null : 'Open level select menu'}><strong onClick={toggleLevelNavMenu}>SELECT LEVEL</strong>{buttons}</p>);
}

export default LevelNavBar;
