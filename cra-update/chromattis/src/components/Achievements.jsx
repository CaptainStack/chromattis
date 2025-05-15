import { achievementsButtonClicked } from '../events';
import '../styles/Achievements.css';

export const Achievements = ({game, achievements, current_display}) => {
  let achievement_labels = achievements.map(achievement => 
    <li key={achievement.id} style={{fontWeight: achievement.condition(game) ? 'bold' : null}}>
      {achievement.condition(game) ? '✓' : '✕'} {achievement.text}
    </li>
  );
  
  return(
    <div className={`Achievements`} style={{display: current_display === 'achievements' ? null : 'none'}}>
      <h1>Achievements 🏆</h1>
      <p>You have completed {achievements.filter(achievement => achievement.condition(game) === true).length} of {achievements.length} achievements</p>
      <ul>
        {achievement_labels}
      </ul>
      <span className='flat-button' onClick={achievementsButtonClicked}>Back to game ↩</span>
    </div>
  )
}

export default Achievements;
