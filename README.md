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
