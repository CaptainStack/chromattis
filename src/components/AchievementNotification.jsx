import '../styles/Achievements.css';
import { achievementsButtonClicked } from '../events';

export const AchievementNotification = ({state}) => {
  return(
    <div id='AchievementNotification' className='hide' style={{position:'absolute', padding:'20px', backgroundColor:'goldenrod', borderRadius:'10px', minWidth:'530px', zIndex:'10'}} onClick={achievementsButtonClicked}>
      <p>Achievement Unlocked</p>
      <p>{state.achievement_text}</p>
    </div>
  )
}

export default AchievementNotification;
