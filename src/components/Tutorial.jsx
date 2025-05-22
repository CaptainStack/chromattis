import '../styles/Tutorial.css';
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';

export const Tutorial = ({show_tutorial, tutorial}) => {
  const lesson = tutorial.levels[tutorial.current_level_index];
  return(
    <div className='Tutorial' style={{ display: show_tutorial ? null : 'none' }}>
      <h1>Tutorial {tutorial.current_level_index} of {tutorial.levels.length - 1}</h1>
      <span className='lesson-text'><strong>{lesson.text}</strong></span>
      <img src={`${import.meta.env.BASE_URL}tutorials/${lesson.image}`} alt={lesson.text}/>
      <div className='row'>
        <span id='previous_tutorial_button' className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}><span>⇦ Previous</span></span>
        <span className='flat-button' onClick={tutorialButtonClicked}><span>Play Game ▶</span></span>
        <span id='next_tutorial_button' className={`flat-button ${tutorial.current_level_index < tutorial.levels.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}><span>Next ⇨</span></span>
      </div>
    </div>
  );
}

export default Tutorial;
