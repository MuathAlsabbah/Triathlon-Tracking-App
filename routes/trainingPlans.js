const express = require('express')
const router = express.Router()
const trainingPlanController = require('../controllers/trainingPlan')
const { ensureAdmin, ensureAuthenticated } = require('../config/auth')

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

// Show details of a specific training plan (Admin)
router.get('/detail/:id', trainingPlanController.getTrainingPlanDetail)

// Delete a training plan (Admin)
router.post(
  '/delete/:id',
  ensureAdmin,
  trainingPlanController.deleteTrainingPlan
)

// Show training plans for the current user
router.get(
  '/user-plans',
  ensureAuthenticated,
  trainingPlanController.getUserTrainingPlans
)

// Route to show progress logging page for a specific exercise
router.get(
  '/log-progress/:exerciseId',
  trainingPlanController.showLogProgressForm
)

// Route to handle form submission and save progress
router.post('/log-progress/:exerciseId', trainingPlanController.logProgress)

// Route to show edit progress form for a specific progress log
router.get(
  '/edit-progress/:progressId',
  trainingPlanController.showEditProgressForm
)

// Route to handle form submission for editing progress
router.post('/edit-progress/:progressId', trainingPlanController.editProgress)

// Route to delete a progress log
router.post(
  '/delete-progress/:progressId',
  trainingPlanController.deleteProgress
)

module.exports = router
