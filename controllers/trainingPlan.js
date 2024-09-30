const TrainingPlan = require('../models/TrainingPlan')
const { User } = require('../models/User')
const Exercise = require('../models/Exercise')

// Admin: Show all training plans
exports.getAllTrainingPlans = (req, res) => {
  TrainingPlan.find()
    .populate('exercises user')
    .then((plans) => res.render('admin/trainingPlans/index', { plans }))
    .catch((err) => res.send(err))
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
  TrainingPlan.findById(req.query.id)
    .populate('exercises user admin')
    .then((plan) => res.render('admin/trainingPlans/detail', { plan }))
    .catch((err) => res.send(err))
}

// Admin: Delete a training plan
exports.deleteTrainingPlan = (req, res) => {
  TrainingPlan.findByIdAndDelete(req.query.id)
    .then(() => res.redirect('/admin/trainingPlans'))
    .catch((err) => res.send(err))
}

// Admin: Show details of a training plan
exports.getUserTrainingPlans = (req, res) => {
  console.log(req.user)

  if (!req.user) {
    return res.send('User not logged in')
  }

  const userId = req.user._id

  TrainingPlan.find({ user: userId }) // Find plans where the 'user' matches the logged-in user's ID
    .populate('exercises')
    .then((plans) => {
      res.render('admin/trainingPlans/user-plans', { plans })
    })
    .catch((err) => {
      console.log(err)
      res.send('Error retrieving training plans')
    })
}
