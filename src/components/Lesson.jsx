export const Lesson = ({lesson}) => {
  return(
    <div className='Lesson'>
      <img src={`${process.env.PUBLIC_URL}/${lesson.image}`} style={{width:'400px', height:'400px', marginBottom:'10px', borderRadius:'10px', border: '10px solid transparent'}}/><br/>
      <span>{lesson.text}</span>
    </div>
  )
}

export default Lesson;
