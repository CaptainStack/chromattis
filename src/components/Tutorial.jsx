import React from 'react';
import '../styles/Tutorial.css';
import { Lesson } from './Lesson'
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';

export const Tutorial = ({show_tutorial, tutorial}) => {
  return(
    <div className='Tutorial' style={{ display: show_tutorial ? null : 'none' }}>
      <Lesson lesson={tutorial.levels[tutorial.current_level_index]} current_level={tutorial.current_level_index}></Lesson>
      <div className='row' style={{marginTop:'8px'}}>
        <span className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}><span>⇦ Previous</span></span>
        <span className='flat-button' onClick={tutorialButtonClicked}><span>Close ✕</span></span>
        <span className={`flat-button ${tutorial.current_level_index < tutorial.levels.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}><span>Next ⇨</span></span>
      </div>
    </div>
  )
}

export default Tutorial;
