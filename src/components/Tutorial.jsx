import '../styles/Tutorial.css';
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';

export const Tutorial = ({show_tutorial, tutorial}) => {
  let lesson = tutorial.levels[tutorial.current_level_index];
  return(
    <div className='Tutorial' style={{ display: show_tutorial ? null : 'none' }}>
      <img src={`${process.env.PUBLIC_URL}/tutorials/${lesson.image}`}/>
      <span><strong>Tutorial {tutorial.current_level_index} of {tutorial.levels.length - 1}:</strong> {lesson.text}</span>
      <div className='row'>
        <span id='previous_tutorial_button' className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}><span>⇦ Previous</span></span>
        <span className='flat-button' onClick={tutorialButtonClicked}><span>Play Game ▶</span></span>
        <span id='next_tutorial_button' className={`flat-button ${tutorial.current_level_index < tutorial.levels.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}><span>Next ⇨</span></span>
      </div>
    </div>
  )
}

export default Tutorial;
