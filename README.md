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
- The backend will also handle user login and signup.
<img width="396" alt="image" src="https://user-images.githubusercontent.com/66726759/204442129-1ebb205d-7583-45d9-8d65-4502f3d28b7c.png">

- As we can see that the React App is connected with a Node API which is interating with the Mongodb database. We can also connect the  React App directly with the database but this will create weak security. Using the middle Node API we are securing sensitive data in the React App such as user credentials. 


# 📚 Backend

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
``` const express = require('express')```
- Then we create an express app by storing it in constant app. 
``` const app = express()```


