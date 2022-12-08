import {useEffect, useState} from 'react'
import CourseDetails from '../components/CourseDetails'
import CourseForm from '../components/CourseForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCourseContext } from '../hooks/useCourseContext'
import LandingPage from './LandingPage';

const Home = () => {
   // const [courses, setCourses] = useState(null)
    const {courses, dispatch } = useCourseContext()
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
               // setCourses(json)
               dispatch({type: 'SET_COURSE', payload: json})
            }
        }
        if(user){
            fetchCourses()
        }
        
    }, [user]) 


    return (
        <div>
        {user && (
            <div className="pages">
            <div className ="courses">
                 {courses && courses.map((course) => (
                         <CourseDetails key={course._id} course={course} />
                 ))}
                 
            </div>
            <CourseForm/>
         </div>
        )}
        {!user && (
            
            <LandingPage/>
            
        )}
        </div>
        
    )
}




export default Home