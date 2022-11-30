# 🚀Course-Hub-MERN
A simple course hub application using MERN (ReactJs, Express, NodeJS and MongoDB)
File structure:
```
backend
      |-- controllers
      |            |--courseController.js
      |            |-- userController.js
      |-- model
      |        |-- courseModel.js
      |        |-- userModel.js
      |-- routes
      |        |-- course.js
               |-- user.js
               
frontend
       |-- components
                   |-- CourseDetails.js
       |
       |
       |
      
```  

# Explaining the stack
- For frontend we will be using ReactJS and the backend is an express app running on a NodeJS environment. This express app will handle the user request and interact with the database to send back data, update data, create data and delete data.
- We will use Express framework with NodeJs since it offers simplicity, efficiency and provides routing, middleware and other components to get an application work quickly. 
- The backend will also handle user login and signup.
<img width="396" alt="image" src="https://user-images.githubusercontent.com/66726759/204442129-1ebb205d-7583-45d9-8d65-4502f3d28b7c.png">

- As we can see that the React App is connected with a Node API which is interating with the Mongodb database. We can also connect the  React App directly with the database but this will create weak security. Using the middle Node API we are securing sensitive data in the React App such as user credentials. 


# 📚 Backend

## 👉Setting up server.js file
- At first we create a folder named backend. 
- Inside this folder we create a file named, server.js where we will setup our express app. 
- Now to create the package.json file we will go to terminal and move to the backend folder.
- We run the below command: 
```
npm init -y
```
💡This will create a package.json file.
- The next step is to install the express package.
```
npm install express
```
- Now inside the server.js file we need to require the express package. 
``` 
const express = require('express')
```
- Then we create an express app by storing it in constant app. 
```
const app = express()
```
- To run the application in our computer we can listen for requests using the express app. 
```
app.listen(4000, () => {
      console.log('Listening on port 4000')
}
```
- This will run our application on localhost 4000 port when we run the below code in the terminal: 
```
PS F:\MERN\coursehub\backend> node server.js
```
## 👉Reacting to Requests
- When we get a request from the browser we want to send back a response and to handle these requests we need to use a get() function. 
```
app.get('/', (req, res) => {
      res.json({msg: 'Welcome to the app'})
}
```
- get() function tells the server what to do with the get request when the given route is called. It has a callback function that listen to the incoming request ```req``` object and respond using ```res``` reponse object. 
```
💡The code untill now looks like this: 

const express = require('express')

//express app
const app = express()

//routes
app.get('/', (req, res) => {
      res.json({msg: 'Welcome to the app'})
})

//listen for requests
app.listen(4000, () => {
      console.log('Listening on port 4000')
}
```
## 👉 Using Environment Variables
- To protect the database connection string, authentication secrect and other sensitive data we can use environment variables. 
- The environment variables will remain hidden when we upload our code to github. 
- We create another file named ```.env``` file. For now we keep the port number inside the file: ``` PORT=4000 ```
- Now, to access these environment variblaes from our code we need dotenv package. 
- In terminal: 
```
PS F:\MERN\coursehub\backend> npm install dotenv
```
- dotenv package loads environment variables from ```.env``` to ```process.env``` object globally in a nodejs environment. 
- In top of our server.js file we require ```dotenv``` package. 
``` 
require('dotenv').config()
```
- Again, we replace the hardcoded port number in ```app.listen()``` to ```process.env.PORT```.
```
app.listen(process.env.PORT, () => {
      console.log('Listening on port ', process.env.PORT)
}
```
## 👉 Testing API requests.
- To test the api requests we will be using postman.

## 👉 API Routes
- At first we create a new folder ```routes``` where we create another file named course.js. 
- To create instance of a router we need the following code inside our course.js file:
```
const express = require('express')

const router = express.Router()
```
- Now, after adding the required routes our course.js file will look something like this:
```
const express = require('express')
const {createCourse, getCourse, getCourses, updateCourse, deleteCourse}
 = require('../controllers/courseController')
 
const router = express.Router()

router.get('/', getCourses)

router.get('/:id',getCourse)

router.post('/', createCourse)

router.delete('/:id',deleteCourse)

router.patch('/:id',updateCourse)


module.exports = router
```
- ``` router.get('/', getCourses) ```  here, when our server gets api request with the endpoint ```/```  then the ```getCourses``` function is fired.
- In the above code, we have imported some functions from a file path: ```'../controllers/courseController'```
- We will configure the controller functions later in this documentation.
- However, to get access to these routes we need to import the routes from course.js and  use a middleware in our server.js file: 
```
const courseRoutes = require('./routes/courses')
...
app.use('/api/courses',courseRoutes)
```

## 👉 Setting Up Database 
- We will be using MongoDB as our database. MongoDB is a document database. Which means, instead of using tables and rows for data storing we will be using documents which resembles ```json```. 
- Instead of configuring the database on our local machine, we will be using  MongoDB atlas which is acloud-based developer data platform. 
- This will save us time and will be easy to manage. 
<img width="956" alt="image" src="https://user-images.githubusercontent.com/66726759/204498861-8d48d88f-9072-40d5-8998-4dcc9290fc9a.png">
- As we can see in the above picture, we need to go to the Network Access section of the MongoDB atlas dashboard after loggin in. Then we need to add our current IP address to connect with our network. 
- Under the Database section we can find a ```connect``` option which will open a window like the below image:
<img width="538" alt="image" src="https://user-images.githubusercontent.com/66726759/204499687-b771803d-c5bb-45d5-93f3-506e36c8fc6a.png">
- We have to copy the connection string and add this to our ```.env``` file. 
- Next up we will install a package called ```mongoose``` which will help us with our MongoDB database.  
- To install mongoose:

``` 
npm install mongoose
```
- To connect to the database from our code we need to insert the code below in our server.js file: 

```
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(
            process.env.PORT, () => {
            console.log('Listening on port 4000!!!', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
```
✨ Creating a Schema  
- The benefit of using Mongoose is that we have a schema to work against in our application code and an explicit relationship between our MongoDB documents and the Mongoose models within our application.
- To create this schema we will be creating a new folder named, model and under that folder we will create a file named ```courseModel.js```. In that file we write the below code:
```
const mongoose  = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports =mongoose.model('Course', courseSchema)

```
- At first,  we need to require the ```mongoose``` package 
```
const mongoose  = require('mongoose')
```
- Then we create a new Schema after declaring a function ``` const Schema = mongoose.Schema ```:
```
const mongoose  = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

```
- Inside the Schema we mention the properties of our document and each of the properties are presented as objects.
- Now to export the Schema we are creating a model and exporting it as ```Course``` so that other files can access it. 
```
module.exports =mongoose.model('Course', courseSchema)
```

## 👉 Interacting with the database
- At first we will be creating a controller folder where we create a ```courseController.js``` file. 
- This file will have all the functions that will be fired when we get an API request. 
- In this ```courseController.js``` file we require two packages: 
```
const Course = require('../model/courseModel')
const mongoose = require('mongoose')
```
- Then to create a new course we declare a function named ```createCourse```:
```
const createCourse = async (req, res) => {
    const {title, description, duration, price} = req.body
    try{
        const course = await Course.create({
            title, description, duration, price
        })
        res.status(200).json(course)
    }catch{
        res.status(200).json({error: error.message})
    }
}
```
- When we get a request from the browser, the properties of ```req.body``` object will be saved in ```title, description, duration, price```.
- To add a new document in the collection of  our database, we use the ```create()``` method. And in this method we pass through the ```title, description, duration, price``` properties.
- We create the methods, ``` getCourse, getCourses, updateCourse, deleteCourse``` to update, delete and get specific courses. 
- The courseController.js file will look something like this: 
```
const Course = require('../model/courseModel')
const mongoose = require('mongoose')

//get all courses
const getCourses = async (req, res) => {
    const courses = await Course.find({}).sort({createdAt: -1})

    res.status(200).json(courses)
}

//get single course
const getCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Course"})
    }
        const course = await  Course.findById(id)
        if(!course){
            return res.status(404).json({error: "No such course"})

        }

    res.status(200).json(course)
}

//create new course
const createCourse = async (req, res) => {
    const {title, description, duration, price} = req.body
    try{
        const course = await Course.create({
            title, description, duration, price
        })
        res.status(200).json(course)
    }catch{
        res.status(200).json({error: error.message})
    }
}



//delete a workout
const deleteCourse = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndDelete({_id: id})
    if(!course){
        return res.status(400).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

//update a workout
const updateCourse = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, 
        {
            ...req.body
        })
        if(!course){
            return res.status(400).json({error: 'No such course'})
        }
    
        res.status(201).json(course)

}

module.exports = {
    createCourse,
    getCourse,
    getCourses,
    deleteCourse,
    updateCourse
}
```

# 📚 Frontend
- At first we create a react app inside the main project file in the terminal:
``` 
npx create-react-app frontend
```
- Next thing we need to do is install the ```react-router-dom``` package to route to different pages. 
- In the terminal:
```
npm install react-router-dom
```
- In the App.js file inside the ```/frontend/src``` folder we import ```BrowserRouter``` which wraps everywhere we want to use the router. 
- We will clear our all the codes inside the App.js file and replace it with:
```
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
```
- Inside the ``` <BrowserRouter>``` tag we will give the below code:
```
<div classname = "pages">
          <Routes>
            <Route
              path="/"
              element={
                 <Home />
              }
            />
            </Routes>
        </div>
```
- As you can see there is a <Home/> tag passed inside the routes tag. We will now build our Home page.

👉 Home Page
- Our basic Home Page structure will look something like this: 
```
const Home = () => {

    return (
        <div className="pages">
           <div className ="courses">
             
           </div>
           <CourseForm/>
        </div>
    )
}

export default Home
```
- Now we will fetch some data from our backend API. We will show all the courses in our Home page and we will do that using the useEffect and useState Hook of React. 
- So, at first we import the react hooks:
```
import {useEffect, useState} from 'react'
```
- Now we declare the useEffect function inside the Home function. Then we fetch the data from the backend we create a const fetchCourses which will be an async function. Inside the function we will be using ```fetch``` api. 

```
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
    }) 
```
- As we can see that we have used ```useState``` to store the state of the courses that will be fetched from the database. The response from the api request is being stored in a const named ```response```. Then to work with the data we need the ```json``` format of the response. 
- After adding the loop to iterate through the courses inside the html, our code will look like this:
```
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
    }) 


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
```
✨ Course Form
- We insert data to create a course we need to build a form. For this we create a new file inside the components folder. 
- Inside the CourseForm.js file we create states for each of the properties.
```
const CourseForm = () =>{

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    
    return ()
    
    }
```
- Now this function will return a form:
```
return (
        

        <form className="create-course" onSubmit={}>
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
```
- As we can see that we are using setState to save our onchanged data inside the input fields.
- To submit these data we need an async function which we name ```handleSubmit```:
```
const handleSubmit = async (e) => {

}
```
- Now inside the handleSubmit we use the ```fetch()``` method to fetch our data:
```
const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {title, description, duration, price}

        const response = await fetch('/api/courses/', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
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
```
- After running our application,  our Home page will look something like this:
<img width="935" alt="image" src="https://user-images.githubusercontent.com/66726759/204710674-2021dcd2-212f-4edb-aa5a-b991b9326519.png">

