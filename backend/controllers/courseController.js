const Course = require('../model/courseModel')
const mongoose = require('mongoose')

//get all courses
const getCourses = async (req, res) => {
    const courses = await  Course.find({}).sort({createdAt: -1})

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

const deleteCourses = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Course"})
    }
    const course = await Course.findOneAndDelete({_id: id})

    if(!course){
        res.status(404).json(course)
    }
    res.status(200).json(course)
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