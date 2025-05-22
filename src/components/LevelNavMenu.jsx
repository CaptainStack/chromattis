import '../styles/LevelNavMenu.css';
import { LevelNavButton } from './LevelNavButton';
import { nextLevelSelectPageClicked, previousLevelSelectPageClicked, toggleLevelNavMenu } from '../events';

export const num_displayed_levels = 48;

export const LevelNavMenu = ({levels, current_level_index, highest_unlocked_level, show_level_nav, page}) => {
  const lower_index = page * num_displayed_levels;
  const upper_index = page * num_displayed_levels + num_displayed_levels;

  const buttons = levels.map((level, index) => {
    const current_level_class = current_level_index === index ? 'current-level' : null;
    const is_unlocked = highest_unlocked_level >= index;

    return <LevelNavButton display_in_nav_menu={index >= lower_index && index < upper_index} show_level_nav={true} key={`${level.id}-NavButton`} level={level} index={index} current_level_index={current_level_index} is_unlocked={is_unlocked} current_level_class={current_level_class}/>;
  });

  return(
    <div className='LevelNavMenu primary-content-container' style={{ display: show_level_nav ? null : 'none'}}>
      <div className='row'>
        <span className={`flat-button ${page === 0 ? 'locked' : null}`} onClick={previousLevelSelectPageClicked}>←</span>
        <h1>{`Levels ${lower_index}-${upper_index - 1 < levels.length ? upper_index - 1 : levels.length - 1}`}</h1>
        <span className={`flat-button ${page * num_displayed_levels + num_displayed_levels > levels.length ? 'locked' : null}`} onClick={nextLevelSelectPageClicked}>→</span>
      </div>
      <div className='nav-button-container'>{buttons}</div>
      <span className='flat-button' onClick={toggleLevelNavMenu}>Back to game ↩</span>
    </div>
  );
}

export default LevelNavMenu;
