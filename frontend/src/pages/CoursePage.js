import {useEffect, useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import CourseForm from '../components/CourseForm'
import { useAuthContext } from '../hooks/useAuthContext'

const CoursePage = () => {
    const [courses, setCourses] = useState(null)
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setCourses(json)
            }
        }
        if(user){
            fetchCourses()
        }
        
    }, [user]) 


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




export default CoursePage