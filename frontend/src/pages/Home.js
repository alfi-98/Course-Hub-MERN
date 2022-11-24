import {useEffect, useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import CourseForm from '../components/CourseForm'
const Home = () => {
    const [courses, setCourses] = useState(null)
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses')
            const json = await response.json()

            if(response.ok){
                setCourses(json)
            }
        }
        fetchCourses()
    }) // is it effective ?? ... remove "[]". which renders continuously


    return (
        <div className="pages">
           <div className ="courses">
                {courses && courses.map((course) => (
                        <CourseDetails key={course._id} course={course} />
                ))}
                
           </div>
           <CourseForm/>
        </div>
    )
}


export default Home