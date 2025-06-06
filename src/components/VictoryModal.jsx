import '../styles/VictoryModal.css';
import { newGameButtonClicked, navigateLevelButtonClicked } from '../events';
import { VictorySound } from '../initial_state';

export const VictoryModal = ({show_victory, game_in_progress, current_moves, current_level_index, best_score, total_levels, last_action, mute_audio}) => {
  return(
    <div className={`VictoryModal primary-content-container bounce-container ${show_victory ? 'show' : 'hide'} ${last_action === 'clicktile' ? 'fade-in' : 'instant'}`}>
      <h2 className='bounce' style={{visibility: current_moves <= best_score ? null : 'hidden'}}>
        {last_action === 'clicktile' && show_victory && !mute_audio ? <audio autoPlay src={VictorySound.src}></audio> : null}
        <span>H</span>
        <span>I</span>
        <span>G</span>
        <span>H</span>
        <span>&nbsp;</span>
        <span>S</span>
        <span>C</span>
        <span>O</span>
        <span>R</span>
        <span>E</span>
        <span>!</span>
      </h2>
      <h1>You solved Level {current_level_index} <br/> in {current_moves} {current_moves === 1 ? 'move' : 'moves'}!</h1>
      <h3>Try to do it in fewer or move on?</h3>
      <div className='row'>
        <span id='previous_puzzle_button' className={`flat-button clickable ${current_level_index > 0 ? null : 'locked'}`} onClick={ navigateLevelButtonClicked(current_level_index > 0 ? current_level_index - 1 : current_level_index) }>← Previous</span>
        <span className='flat-button clickable' onClick={ newGameButtonClicked }>Reset ⇵</span>
        <span id='next_puzzle_button' className={`flat-button clickable ${current_level_index < total_levels - 1 ? null : 'locked'}`} onClick={ navigateLevelButtonClicked(current_level_index < total_levels ? current_level_index + 1 : current_level_index) }>Next →</span>
      </div>
      <h3>Brag about it:</h3>
      <div className='row victory-share' style={{ display: game_in_progress ? 'none' : null }}>
        <a className='social-share' href={`//twitter.com/share?text=${encodeURIComponent(`I just beat #Chromattis Level ${current_level_index} in ${current_moves} ${current_moves === 1 ? 'move' : 'moves'}. I bet you can't do it in fewer!\n\nPlay for free here:\n`)}`} target='_blank' rel='noreferrer'><img src={`${import.meta.env.BASE_URL}x.png`} alt='Post on X'/></a>
        <a className='social-share' href='//facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse' target='_blank' rel='noreferrer' ><img src={`${import.meta.env.BASE_URL}facebook.png`} alt='Share on Facebook' target='_blank' rel='noreferrer'/></a>
        <a className='social-share' href={`//reddit.com/submit?url=${encodeURIComponent(window.location)}&title=${encodeURIComponent('Just discovered a new puzzle game called Chromattis. It\'s challenging but very fun (and free)!')}`} target='_blank' rel='noreferrer'> <img src={`${import.meta.env.BASE_URL}reddit.png`} alt='submit to reddit'/></a>
      </div>
    </div>
  );
}

export default VictoryModal;
