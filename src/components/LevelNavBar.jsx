import '../styles/LevelNavBar.css';
import { LevelNavButton } from './LevelNavButton';
import { toggleLevelNavMenu } from '../events';

export const LevelNavBar = ({levels, current_level_index, highest_unlocked_level, hide_tooltips}) => {

  const buttons = levels.map((level, index) => {

    const current_level_class = current_level_index === index ? 'current-level' : null;
    const is_unlocked = highest_unlocked_level >= index;

    // The LevelNavBar should always display 10 levels and attempt to place the current level in the center
    const nav_levels_highest = current_level_index + 6 < 10 ? 10 : current_level_index + 6;
    const nav_levels_lowest = current_level_index - 5 < levels.length - 11 ? current_level_index - 5 : levels.length - 11;

    return(<LevelNavButton hide_tooltips={hide_tooltips} display_in_nav_bar={index > nav_levels_lowest && index < nav_levels_highest} key={`${level.id}-NavButton`} level={level} index={index} current_level_index={current_level_index} is_unlocked={is_unlocked} current_level_class={current_level_class}/>);
  });

  return(<div className='LevelNavBar row' title={hide_tooltips ? null : 'Open level select menu [l]'}><strong onClick={toggleLevelNavMenu}>SELECT LEVEL</strong>{buttons}</div>);
}

export default LevelNavBar;
