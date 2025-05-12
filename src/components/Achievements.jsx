import '../styles/Achievements.css';

export const Achievements = ({state, achievements}) => {
  let achievement_labels = achievements.map(achievement => 
    <li key={achievement.id} style={{fontWeight: achievement.condition(state) ? 'bold' : null}}>
      {achievement.condition(state) ? '✓' : '✕'} {achievement.text}
    </li>
  );
  
  return(
    <div className={`Achievements`} style={{display: state.current_display === 'achievements' ? null : 'none'}}>
      <h1>Achievements 🏆</h1>
      <p>You have completed {achievements.filter(achievement => achievement.condition(state) === true).length} of {achievements.length} achievements</p>
      <ul>
        {achievement_labels}
      </ul>
    </div>
  )
}

export default Achievements;
