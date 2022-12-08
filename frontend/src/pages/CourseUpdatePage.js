
import { Link, useParams, useLocation } from 'react-router-dom'
import { useCourseContext } from '../hooks/useCourseContext'
import { useEffect, useState } from 'react';
import Home from './Home';

const CourseUpdatePage = () => {
    const params = useParams()
    const {id} = params
    const {courses, dispatch} = useCourseContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`/api/courses/${id}`)
            const json = await response.json()
            if(response.ok){
               // setCourses(json)
               console.log("json", json)
               setTitle(json.title)
               setDescription(json.description)
               setDuration(json.duration)
               setPrice(json.price)
            }
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
            <h1>  
                                <>
                                <h3 className='course-heading'>Upgrade Course</h3>
                               <div className="course-update-page">
                                    <h4>Course Title</h4>
                                    <input
                                        type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />
                                    <p>
                                        Course Description
                                    </p>
                                    <input
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                                    <p>
                                      Course Duration
                                    </p>
                                    <input
                                        type="text"
                                        onChange={(e) => setDuration(e.target.value)}
                                        value={duration}
                                    />
                                    <p>
                                      Course Price
                                    </p>
                                    <input
                                        type="text"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                         <Link to="/"><button className="update" onClick={handleUpdate} >Update</button></Link>  
                                
                                </div>
                                </>                         
                           </h1>
        </div>
     )
 }

 export default CourseUpdatePage