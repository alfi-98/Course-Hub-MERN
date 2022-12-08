
import { Link, useParams, useLocation } from 'react-router-dom'
import { useCourseContext } from '../hooks/useCourseContext'
import { useEffect, useState } from 'react';
import Home from './Home';

const CoursePage = () => {
    const params = useParams()
    const {id} = params
    const {courses, dispatch} = useCourseContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses')
            const json = await response.json()
            if(response.ok){
               // setCourses(json)
               dispatch({type: 'SET_COURSE', payload: json})
            }
            courses && courses.map((course) => { 
                if(course._id === id){
                    setTitle(course.title)
                    setDescription(course.description)
                    setDuration(course.duration)
                    setPrice(course.price)
                }
            });
        }
        fetchCourses()
       
    }, []) 

    const handleUpdate = async () => {
        const response = await fetch('/api/courses/' + id, {
            method: 'PATCH' ,
            body: JSON.stringify({title, description, duration, price}),
            headers: {
                'Content-Type': "application/json"
            }
        });
        const json  = await response.json()
        console.log(title, description, duration, price)
    }
    return(    
        <div>
            <h1>  {courses && courses.map((course) => { 
                        if(course._id === id){
                            return (
                                <>
                                <h3 className='course-heading'>Course Details</h3>
                               <div className="course-update-page">
                                
                                    <h6>Course Title:  <span>{title}</span></h6>
                                    <h6>Course Description: <span>{description}</span></h6>
                                    <h6>Course Duration: <span>{duration}</span></h6>
                                    <h6>Course Price: <span>{price}</span></h6>
                                </div>
                                </>                         
                            );
                        }                       
                 })}</h1>
        </div>
     )
 }

 export default CoursePage