import React from 'react';
import '../styles/Tutorial.css';
import { Lesson } from './Lesson'
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';

export const Tutorial = ({tutorial_on, tutorial}) => {
  return(
    <div className='Tutorial' style={{ display: tutorial_on ? null : 'none' }}>
      <strong >Lesson {tutorial.current_level_index}</strong >
      <Lesson lesson={tutorial.lessons[tutorial.current_level_index]}></Lesson>
      <div className='row' style={{marginTop:'8px'}}>
        <span className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}>Previous lesson</span>
        <span className='flat-button' onClick={tutorialButtonClicked}>Exit tutorial</span>
        <span className={`flat-button ${tutorial.current_level_index < tutorial.lessons.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}>Next lesson</span>
      </div>
    </div>
  )
}

export default Tutorial;
