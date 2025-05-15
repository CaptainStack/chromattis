import { navigateLevelButtonClicked } from '../events';

export const LevelNavButton = ({display_in_nav_menu, display_in_nav_bar, index, current_level_class, is_unlocked, hide_tooltips}) => {
  return (
    <span
        className={`level-navigation-button ${ current_level_class } ${ is_unlocked ? 'unlocked' : 'locked' } ${display_in_nav_bar ? 'in-nav' : 'hide-in-nav'} ${display_in_nav_menu ? 'in-menu' : 'hide-in-menu'}`} 
        onClick={ navigateLevelButtonClicked(index) }
        title={ hide_tooltips ? null : is_unlocked ? `Go to Level ${index}` : `You haven't unlocked Level ${index} yet` } >
        {index}
    </span>
  )
}

export default LevelNavButton;
