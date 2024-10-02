const TrainingPlan = require('../models/TrainingPlan')
const { User } = require('../models/User')
const Exercise = require('../models/Exercise')
const Tracking = require('../models/Tracking')

// Admin: Show all training plans
exports.getAllTrainingPlans = (req, res) => {
  const { userId } = req.query // Get userId from query parameters

  // Fetch all users to populate the filter dropdown
  User.find({ role: 'user' })
    .then((users) => {
      // Define the query object
      let query = {}
      if (userId && userId !== 'all') {
        query.user = userId
      }

      // Find training plans with the query
      return TrainingPlan.find(query)
        .populate('exercises')
        .populate('user')
        .then((plans) => ({ users, plans }))
    })
    .then(({ users, plans }) => {
      res.render('admin/trainingPlans/index', {
        plans,
        users,
        selectedUser: req.query.userId || 'all'
      })
    })
    .catch((err) => {
      console.error('Error fetching training plans:', err)
      res.send('Error fetching training plans')
    })
}

// Admin: Show form to create a new training plan
exports.showAddForm = (req, res) => {
  User.find({ role: 'user' })
    .then((users) => {
      console.log('Users:', users) // Log to check if users are being fetched correctly
      Exercise.find()
        .then((exercises) => {
          console.log('Exercises:', exercises) // Log to check if exercises are being fetched correctly
          res.render('admin/trainingPlans/add', { users, exercises })
        })
        .catch((err) => {
          console.error('Error fetching exercises:', err) // Log the specific error for exercises
          res.send('Error fetching exercises')
        })
    })
    .catch((err) => {
      console.error('Error fetching users:', err) // Log the specific error for users
      res.send('Error fetching users')
    })
}

// Admin: Create a new training plan
exports.createTrainingPlan = (req, res) => {
  console.log(req.body) // Check the form data being received

  const { title, description, exercises, userId } = req.body

  const newPlan = new TrainingPlan({
    title,
    description,
    exercises,
    user: userId,
    admin: req.user.id
  })

  newPlan
    .save()
    .then(() => res.redirect('/admin/trainingPlans'))
    .catch((err) => res.send(err))
}

// Admin: Show form to edit a training plan
exports.showEditForm = (req, res) => {
  TrainingPlan.findById(req.params.id)
    .populate('exercises user')
    .then((plan) => {
      User.find({ role: 'user' }).then((users) => {
        Exercise.find().then((exercises) => {
          res.render('admin/trainingPlans/edit', { plan, users, exercises })
        })
      })
    })
    .catch((err) => res.send(err))
}

// Admin: Update a training plan
exports.updateTrainingPlan = (req, res) => {
  const { title, description, exercises, userId } = req.body

  TrainingPlan.findByIdAndUpdate(req.params.id, {
    title,
    description,
    exercises,
    user: userId
  })
    .then(() => res.redirect('/admin/trainingPlans'))
    .catch((err) => res.send(err))
}

// Admin: Show details of a training plan
exports.getTrainingPlanDetail = (req, res) => {
  const planId = req.params.id

  TrainingPlan.findById(planId)
    .populate('exercises user')
    .then((plan) => {
      if (!plan) {
        return res.send('Plan not found')
      }

      // Fetch the progress logs for this user and plan
      Tracking.find({ user: plan.user._id, trainingPlan: plan._id })
        .populate('exercise')
        .then((progressLogs) => {
          res.render('admin/trainingPlans/detail', { plan, progressLogs })
        })
        .catch((err) => res.send('Error retrieving progress logs'))
    })
    .catch((err) => res.send('Error retrieving training plan'))
}

// Admin: Delete a training plan
exports.deleteTrainingPlan = (req, res) => {
  const planId = req.params.id // Use req.params.id instead of req.query.id

  TrainingPlan.findByIdAndDelete(planId)
    .then(() => res.redirect('/admin/trainingPlans'))
    .catch((err) => res.send('Error deleting training plan'))
}

// Admin: Show details of a training plan
exports.getUserTrainingPlans = (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/google') // Redirect to login if not logged in
  }

  const userId = req.user._id

  TrainingPlan.find({ user: userId })
    .populate('exercises')
    .then((plans) => {
      // For each exercise, populate the progress logs
      Tracking.find({ user: userId }).then((progressLogs) => {
        // Pass the progress logs along with the plans
        res.render('admin/trainingPlans/user-plans', { plans, progressLogs })
      })
    })
    .catch((err) => res.send('Error retrieving training plans'))
}

// Controller to show the log progress form
exports.showLogProgressForm = (req, res) => {
  const { exerciseId } = req.params

  // Find the exercise by ID
  Exercise.findById(exerciseId)
    .then((exercise) => {
      if (!exercise) {
        return res.status(404).send('Exercise not found')
      }
      res.render('admin/trainingPlans/log-progress', { exercise }) // Render the form with the exercise data
    })
    .catch((err) => {
      console.error('Error fetching exercise:', err)
      res.send('Error fetching exercise')
    })
}

// Controller to handle logging progress
exports.logProgress = (req, res) => {
  const { exerciseId } = req.params
  const { notes, duration, calories_burned } = req.body
  const userId = req.user._id

  console.log('Exercise ID:', exerciseId)
  console.log('User ID:', userId)
  console.log('Form Data:', req.body)

  // Find the training plan that contains this exercise
  TrainingPlan.findOne({ exercises: exerciseId })
    .then((plan) => {
      if (!plan) {
        return res.send('Training Plan not found.')
      }

      // Create a new progress log
      const newTracking = new Tracking({
        user: userId,
        exercise: exerciseId,
        trainingPlan: plan._id,
        status: 'completed', // Use the correct enum value
        notes,
        duration,
        calories_burned
      })

      return newTracking.save()
    })
    .then(() => {
      res.redirect('/admin/trainingPlans/user-plans') // Redirect to the user's training plans
    })
    .catch((err) => {
      console.error('Error logging progress:', err)
      res.send('Error logging progress.')
    })
}

// Show edit progress form
exports.showEditProgressForm = (req, res) => {
  const { progressId } = req.params

  Tracking.findById(progressId)
    .populate('exercise') // Populate the exercise data
    .then((progress) => {
      if (!progress) {
        return res.status(404).send('Progress log not found')
      }
      res.render('admin/trainingPlans/edit-progress', {
        progress,
        exercise: progress.exercise
      })
    })
    .catch((err) => {
      console.error('Error fetching progress log:', err)
      res.send('Error fetching progress log.')
    })
}

// Handle edit progress form submission
exports.editProgress = (req, res) => {
  const { progressId } = req.params
  const { notes, duration, calories_burned } = req.body

  Tracking.findByIdAndUpdate(progressId, {
    status: 'complete',
    notes,
    duration,
    calories_burned
  })
    .then(() => {
      res.redirect('/admin/trainingPlans/user-plans')
    })
    .catch((err) => {
      console.error('Error updating progress log:', err)
      res.send('Error updating progress log.')
    })
}

// Handle deleting a progress log
exports.deleteProgress = (req, res) => {
  const { progressId } = req.params

  Tracking.findByIdAndDelete(progressId)
    .then(() => {
      res.redirect('/admin/trainingPlans/user-plans')
    })
    .catch((err) => {
      console.error('Error deleting progress log:', err)
      res.send('Error deleting progress log.')
    })
}
