import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const CourseForm = () =>{


    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return  
        }

        const course = {title, description, duration, price}

        const response = await fetch('/api/courses/', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            
        })

        const json  = await response.json()

        if(!response.ok){
            setError(json.error)

        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setDuration('')
            setPrice('')
            setError(null)
            console.log('new course added', json)
        }

    }
    return (
        

        <form className="create-course" onSubmit={handleSubmit}>
            <h3>
                Add a New Course
            </h3>
            <label>Course Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Description</label>
                        <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
            />
             <label>Duration</label>
                        <input
                            type="text"
                            onChange={(e) => setDuration(e.target.value)}
                            value={duration}
            />
             <label>Price</label>
                        <input
                            type="text"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
            />
            <button>Add Course</button>
        </form>

    )
}


export default CourseForm