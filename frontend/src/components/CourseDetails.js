
const CourseDetails = ({course}) => {

    const handleDelete = async (e) => {
       
    
        const response = await fetch('/api/course' + course._id, {
            method: 'DELETE' ,
       
        })
        const json  = await response.json()

       
       

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
                
            <button className="view">View</button>
                <button className="update">Update</button>
                <button className="delete ">Delete</button>
            </div>
            

        
            {/* <span onClick={handleDelete}>Delete</span> */}
        </div>
    )
}

export default CourseDetails