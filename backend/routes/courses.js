const { Router } = require('express')
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