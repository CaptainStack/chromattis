import React from 'react';
import '../styles/Tutorial.css';
import { Lesson } from './Lesson'
import { tutorialButtonClicked, previousTutorialButtonClicked, nextTutorialButtonClicked } from '../events';
import { IMAGE_URLS } from '../image_urls';

export const Tutorial = ({show_tutorial, tutorial}) => {
  return(
    <div className='Tutorial' style={{ display: show_tutorial ? null : 'none' }}>
      <strong >Lesson {tutorial.current_level_index}</strong >
      <Lesson lesson={tutorial.levels[tutorial.current_level_index]} image_url={IMAGE_URLS[tutorial.levels[tutorial.current_level_index].image]}></Lesson>
      <div className='row' style={{marginTop:'8px'}}>
        <span className={`flat-button ${tutorial.current_level_index > 0 ? null : 'locked'}`} onClick={previousTutorialButtonClicked}>Previous lesson</span>
        <span className='flat-button' onClick={tutorialButtonClicked}>Exit tutorial</span>
        <span className={`flat-button ${tutorial.current_level_index < tutorial.levels.length - 1 ? null : 'locked'}`} onClick={nextTutorialButtonClicked}>Next lesson</span>
      </div>
    </div>
  )
}

export default Tutorial;
