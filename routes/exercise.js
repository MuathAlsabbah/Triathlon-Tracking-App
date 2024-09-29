const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exercise')
const { ensureAdmin } = require('../config/auth')

// CRUD routes for exercises
router.post('/add', ensureAdmin, exerciseController.createExercise)
router.get('/', ensureAdmin, exerciseController.getExercises)
router.put('/edit/:id', ensureAdmin, exerciseController.updateExercise)
router.delete('/delete/:id', ensureAdmin, exerciseController.deleteExercise)

module.exports = router
