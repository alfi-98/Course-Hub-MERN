const express = require('express')
const {createCourse, getCourse, getCourses, updateCourse, deleteCourse}
 = require('../controllers/courseController')

 const requireAuth = require('../middleware/requireAuth')
 
const router = express.Router()


/**
 * router.use(requireAuth)
 */


router.get('/', getCourses)

router.get('/:id',getCourse)

router.post('/', createCourse)

router.delete('/:id',deleteCourse)

router.patch('/:id',updateCourse)


module.exports = router