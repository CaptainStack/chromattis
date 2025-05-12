import '../styles/Achievements.css';
import { achievementsButtonClicked } from '../events';

export const AchievementNotification = ({state}) => {
  return(
    <div id='AchievementNotification' className='hide' onClick={achievementsButtonClicked}>
      <strong>Achievement Unlocked</strong>
      <p>{state.achievement_text}</p>
    </div>
  )
}

export default AchievementNotification;
