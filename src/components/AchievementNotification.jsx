import '../styles/Achievements.css';
import { achievementsButtonClicked } from '../events';

export const AchievementNotification = ({state}) => {
  return(
    <div id='AchievementNotification' className='hide' style={{position:'absolute', top:'0', padding:'18px 0 18px 0', backgroundColor:'goldenrod', borderRadius:'10px', width:'100%', zIndex:'10', cursor:'pointer'}} onClick={achievementsButtonClicked}>
      <strong>Achievement Unlocked</strong>
      <p>{state.achievement_text}</p>
    </div>
  )
}

export default AchievementNotification;
