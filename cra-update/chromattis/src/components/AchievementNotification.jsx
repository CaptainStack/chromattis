import '../styles/Achievements.css';
import { achievementsButtonClicked } from '../events';

export const AchievementNotification = ({achievement_text}) => {
  return(
    <div id='AchievementNotification' className='hide' onClick={achievementsButtonClicked}>
      <strong>Achievement Unlocked</strong>
      <p>{achievement_text}</p>
    </div>
  )
}

export default AchievementNotification;
