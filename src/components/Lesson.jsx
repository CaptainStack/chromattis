const ASSET_PATH = window.location.host.includes('localhost') ? './chromattis/tutorial/' : './tutorial/';

export const Lesson = ({lesson}) => {
  return(
    <div className='Lesson'>
      <span>{lesson.text}</span>
      <img src={`${ASSET_PATH}${lesson.image}`} style={{width:'400px', height:'400px', marginBottom:'10px', borderRadius:'10px', border: '10px solid transparent'}}/>
    </div>
  )
}

export default Lesson;
