export const Lesson = ({lesson, image_url}) => {
  return(
    <div className='Lesson'>
      <img src={`data:image/gif;base64,${image_url}`} style={{width:'400px', height:'400px', marginBottom:'10px', borderRadius:'10px', border: '10px solid transparent'}}/><br/>
      <span>{lesson.text}</span>
    </div>
  )
}

export default Lesson;
