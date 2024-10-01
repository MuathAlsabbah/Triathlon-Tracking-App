// Load Dependencies
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// Crud operations

// Create - HTTP GET and POST
// Read - HTTP GET
// Update - HTTP Get and Post
//Delete - HTTP Delete

const { UserExerciseExercise } = require('../models/UserExerciseExercise')


exports.userExerciseExercise_create_get = (req, res) => {
  UserExerciseExercise.find()
    .then((userExercises) => {
      res.render('userExercise/add', { userExercises })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.userExercise_create_post = (req, res) => {
  console.log(req.body)
  let userExercise = new UserExercise(req.body)

  // Save UserExercise
  // Referenced Design Model
  userExercise
    .save()
    .then(() => {
      req.body.userExercise.forEach(userExercise => {
        UserExercise.findById(userExercise)
        .then((userExercise => {
          userExercise.userExercise.push(userExercise)
          userExercise.save
        }))
        .catch((err) => {
          console.log(err)
        })
      })
      res.redirect("/userExercise/index")
    })
    .catch((err) => {
      console.log(err)
      
    })

  // Embedded Design Model
  //   Author.findById(req.body.author)
  //   .then(author => {
  //     author.userExercise.push(userExercise)
  //     author.save()
  //     res.redirect("/author/index")
  //   })
  //   .catch( err => {
  //     console.log(err)
  //   })
}

exports.userExercise_index_get = (req, res) => {
  UserExercise.findById(req.userExercise._id)
    .then((userExercises) => {
      res.render('userExercise/index', { userExercises, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.userExercise_show_get = (req, res) => {
  console.log(req.query.id)
  UserExercise.findById(req.query.id)
    .then((userExercise) => {
      console.log("image userExercise", userExercise.image)
      res.render('userExercise/index', { userExercise, dayjs })
    })
    .catch((err) => {
      console.log(err)

    })
}

exports.userExercise_edit_get = (req, res) => {
  console.log(req.query.id)
  UserExercise.findById(req.query.id)
    .then((userExercise) => {
      res.render('userExercise/edit', { userExercise })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.userExercise_update_post = (req, res) => {
  console.log(req.body.id)
  UserExercise.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/userExercise/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.userExercise_delete_get = (req, res) => {
  console.log(req.body.id)
  UserExercise.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/userExercise/')
    })
    .catch((err) => {
      console.log(err)
    })
}
