const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Exercise = require('../models/Exercise')

exports.exercise_create_get = (req, res) => {
  res.render('exercise/add')
}

exports.exercise_create_post = (req, res) => {
  console.log(req.body)
  let exercise = new Exercise(req.body)

  exercise
    .save()
    .then(() => {
      res.redirect('/exercise/index')
    })
    .catch((err) => {
      console.log(err)
      res.send('Please try again later!!!')
    })
}

exports.exercise_index_get = (req, res) => {
  Exercise.find()
    .then((exercise) => {
      res.render('exercise/index', { exercise, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.exercise_show_get = (req, res) => {
  console.log(req.query.id)
  Exercise.findById(req.query.id)
    .then((exercise) => {
      res.render('exercise/detail', {
        exercise,
        dayjs
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.exercise_edit_get = (req, res) => {
  console.log(req.query.id)
  Exercise.findById(req.query.id)
    .then((exercise) => {
      res.render('exercise/edit', { exercise })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.exercise_update_post = (req, res) => {
  console.log(req.body.id)
  Exercise.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/exercise/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.exercise_delete_get = (req, res) => {
  console.log(req.query.id)
  Exercise.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/exercise/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
