

export const Lesson = ({lesson, current_level}) => {
  return(
    <div className='Lesson'>
      <img src={`${process.env.PUBLIC_URL}/tutorials/${lesson.image}`} style={{width:'390px', height:'390px', marginBottom:'8px', borderRadius:'10px'}}/><br/>
      <strong>LESSON {current_level}: {lesson.text}</strong>
    </div>
  )
}

export default Lesson;
