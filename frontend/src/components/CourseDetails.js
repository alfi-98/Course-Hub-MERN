import { useCourseContext } from "../hooks/useCourseContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from "react-router-dom"
import CourseUpdatePage from './../pages/CourseUpdatePage';

const CourseDetails = ({course}) => {

    const {dispatch} = useCourseContext()
    const {user } = useAuthContext()
    const handleDelete = async (e) => {
       
        if(!user){
            return
        }
        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE' ,
       
        })
        const json  = await response.json()

       if(response.ok){
        dispatch({type: 'DELETE', payload: json})
       }
       

    }

 
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p>
                {course.description}
            </p>
            <p>
                <strong>Duration: </strong>{course.duration}
            </p>
            <p>
                <strong>Price: </strong>{course.price}
            </p>

            <div className="CRUD-BUTTON">
            <Link to={{pathname: `/coursePage/${course._id}`, 
                       data: course._id
                
                    }} >
            <button className="view">View</button>
            </Link>
            
                <Link to={{pathname: "/updatePage/"+course._id, 
                       data: course._id
                
                    }} > <button className="update" >Update</button></Link>
                <button className="delete " onClick={handleDelete}>Delete</button>
            </div> 
            

        
            {/* <span onClick={handleDelete}>Delete</span> */}
        </div>
    )
}

export default CourseDetails