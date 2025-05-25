import { achievementsButtonClicked } from '../events';
import '../styles/Achievements.css';

export const Achievements = ({state, achievements}) => {
  const num_completed_achievements = achievements.filter(achievement => achievement.condition(state) === true).length;
  const num_total_achievements = achievements.length;
  const percent_complete = Math.floor(num_completed_achievements / num_total_achievements * 100);
  const achievement_labels = achievements.map(achievement => 
    <li key={achievement.id} style={{fontWeight: achievement.condition(state) ? 'bold' : null}}>
      {achievement.condition(state) ? '✓' : '✕'} {achievement.text}
    </li>
  );
  
  return(
    <div className={'Achievements primary-content-container'} style={{display: state.current_display === 'achievements' ? null : 'none'}}>
      <h1>Achievements 🏆</h1>
      <strong>You have completed {num_completed_achievements} of {num_total_achievements} achievements</strong>
      <div className='ProgressBar'>
        <div className='progress-percent' style={{width: `${percent_complete}%`}}><span>{`${percent_complete}%`}</span></div>
      </div>
      <ul>
        {achievement_labels}
      </ul>
      <span className='flat-button clickable' onClick={achievementsButtonClicked}>Back to game ↩</span>
    </div>
  );
}

export default Achievements;
