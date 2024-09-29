const Exercise = require('../models/Exercise')

// Create a new exercise
exports.createExercise = (req, res) => {
  const { name, description, duration } = req.body

  const newExercise = new Exercise({
    name,
    description,
    duration,
    admin: req.user.id
  })

  newExercise
    .save()
    .then(() => res.redirect('/exercises'))
    .catch((error) => res.status(500).send('Server error'))
}

// Get all exercises
exports.getExercises = (req, res) => {
  Exercise.find()
    .then((exercises) => res.render('admin/exercises', { exercises }))
    .catch((error) => res.status(500).send('Server error'))
}

// Update an exercise
exports.updateExercise = (req, res) => {
  const { name, description, duration } = req.body

  Exercise.findByIdAndUpdate(req.params.id, { name, description, duration })
    .then(() => res.redirect('/exercises'))
    .catch((error) => res.status(500).send('Server error'))
}

// Delete an exercise
exports.deleteExercise = (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/exercises'))
    .catch((error) => res.status(500).send('Server error'))
}
