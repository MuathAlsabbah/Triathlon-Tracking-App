// routes/trainingPlans.js
const express = require('express')
const router = express.Router()
const trainingPlanController = require('../controllers/trainingPlan')
const { ensureAdmin } = require('../config/auth')

// Show all training plans (Admin)
router.get('/', trainingPlanController.getAllTrainingPlans)

// Show form to create a new training plan (Admin)
router.get('/add', ensureAdmin, trainingPlanController.showAddForm)

// Create a new training plan (Admin)
router.post('/', ensureAdmin, trainingPlanController.createTrainingPlan)

// Show form to edit a training plan (Admin)
router.get('/edit/:id', ensureAdmin, trainingPlanController.showEditForm)

// Update a training plan (Admin)
router.post('/edit/:id', ensureAdmin, trainingPlanController.updateTrainingPlan)

// Show details of a training plan (Admin)
router.get('/:id', trainingPlanController.getTrainingPlanDetail)

// Delete a training plan (Admin)
router.post('/delete', ensureAdmin, trainingPlanController.deleteTrainingPlan)

router.get('/user-plans', trainingPlanController.getUserTrainingPlans)

module.exports = router
