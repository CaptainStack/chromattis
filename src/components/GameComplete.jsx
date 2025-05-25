import '../styles/GameComplete.css';
import { navigateLevelButtonClicked } from '../events';

export const GameComplete = ({game}) => {
  let total_moves = 0;
  for (const level of game.levels) {
    total_moves += level.moves;
  }
  return(
    <div className='GameComplete primary-content-container' >
      <div class='firework'></div>
      <div class='firework'></div>
      <div class='firework'></div>
      <h2>CONGRATULATIONS!</h2>
      <h1>You beat Chromattis<br/> in {total_moves} moves</h1>
      <h3>Try to do it in fewer or move on?</h3>
      <div className='row'>
        <span id='previous_puzzle_button' className={`flat-button`} onClick={ navigateLevelButtonClicked(0) }>↩ Back to start</span>
        <a className='flat-button clickable' href='//opencollective.com/public-stackhouse/projects/chromattis/donate?interval=month&amount=10&contributeAs=me' target='_blank' rel='noreferrer'>Donate</a>
      </div>
      <h3>Tell the world:</h3>
      <div className='row victory-share'>
        <a className='social-share' href={`//twitter.com/share?text=${encodeURIComponent(`I just beat #Chromattis Level ${''} in ${''} ${''}. I bet you can't do it in fewer!\n\nPlay for free here:\n`)}`} target='_blank' rel='noreferrer'><img src={`${import.meta.env.BASE_URL}x.png`} alt='Post on X'/></a>
        <a className='social-share' href='//facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcaptainstack.github.io%2Fchromattis%2F&amp;src=sdkpreparse' target='_blank' rel='noreferrer'><img src={`${import.meta.env.BASE_URL}facebook.png`} alt='Share on Facebook' target='_blank' rel='noreferrer'/></a>
        <a className='social-share' href={`//reddit.com/submit?url=${encodeURIComponent(window.location)}&title=${encodeURIComponent('Just discovered a new puzzle game called Chromattis. It\'s challenging but very fun (and free)!')}`} target='_blank' rel='noreferrer'> <img src={`${import.meta.env.BASE_URL}reddit.png`} alt='submit to reddit'/></a>
      </div>
    </div>
  );
}

export default GameComplete;
