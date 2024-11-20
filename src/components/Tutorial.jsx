import React from 'react';
import '../styles/Tutorial.css';
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';

export const Tutorial = ({show_tutorial, tutorial}) => {
  let lesson = tutorial.levels[tutorial.current_level_index];
  return(
    <div className='Tutorial' style={{ display: show_tutorial ? null : 'none' }}>
      <img src={`${process.env.PUBLIC_URL}/tutorials/${lesson.image}`} style={{width:'390px', height:'390px', marginBottom:'8px', borderRadius:'10px'}}/>
      <strong>LESSON {tutorial.current_level_index} - {lesson.text}</strong>
      <div className='row' style={{marginTop:'8px'}}>
        <span className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}><span>⇦ Previous</span></span>
        <span className='flat-button' onClick={tutorialButtonClicked}><span>Close ✕</span></span>
        <span className={`flat-button ${tutorial.current_level_index < tutorial.levels.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}><span>Next ⇨</span></span>
      </div>
    </div>
  )
}

export default Tutorial;
