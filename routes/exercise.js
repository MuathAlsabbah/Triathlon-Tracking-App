const express = require('express')
const Exercise = require('../models/Exercise')
const { ensureAdmin } = require('../config/auth')
const router = express.Router()

// Admin: Create Exercise
router.post('/add', ensureAdmin, (req, res) => {
  const { name, description, difficulty_level, duration } = req.body

  const newExercise = new Exercise({
    name,
    description,
    difficulty_level,
    duration,
    admin: req.user.id
  })

  newExercise
    .save()
    .then(() => res.redirect('/admin/exercises'))
    .catch((error) => res.send('Server error'))
})

// Admin: Read Exercises
router.get('/', ensureAdmin, (req, res) => {
  Exercise.find()
    .then((exercises) => res.render('admin/exercises', { exercises }))
    .catch((error) => res.send('Server error'))
})

// Admin: Update Exercise
router.put('/edit/:id', ensureAdmin, (req, res) => {
  const { name, description, duration } = req.body

  Exercise.findByIdAndUpdate(req.params.id, { name, description, duration })
    .then(() => res.redirect('/admin/exercises'))
    .catch((error) => res.status(500).send('Server error'))
})

// Admin: Delete Exercise
router.delete('/delete/:id', ensureAdmin, (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/admin/exercises'))
    .catch((error) => res.status(500).send('Server error'))
})

module.exports = router
