const CourseDetails = ({course}) => {


    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/course' + course._id, {
            method: 'DELETE' 
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
            {/* <span onClick={handleDelete}>Delete</span> */}
        </div>
    )
}

export default CourseDetails