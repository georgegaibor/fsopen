import courses from "./courseData";
import Course from "./components/Course";


const App = () => {
  
  return (
    <div>
      <h1>Web dev syllabus</h1>
      {courses.map(course => 
        <Course key ={course.id} course={course}/>  
      )}
    </div>
  )
}

export default App