// Load Dependencies
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// Crud operations

// Create - HTTP GET and POST
// Read - HTTP GET
// Update - HTTP Get and Post
//Delete - HTTP Delete

const { User } = require('../models/User')
const Tracking  = require('../models/Tracking')


exports.user_create_get = (req, res) => {
  User.find()
    .then((users) => {
      res.render('user/add', { users })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_create_post = (req, res) => {
  console.log(req.body)
  let user = new User(req.body)

  // Save User
  // Referenced Design Model
  user
    .save()
    .then(() => {
      req.body.user.forEach(user => {
        Author.findById(author)
        .then((author => {
          author.user.push(user)
          author.save
        }))
        .catch((err) => {
          console.log(err)
        })
      })
      res.redirect("/user/index")
    })
    .catch((err) => {
      console.log(err)
      
    })

  // Embedded Design Model
  //   Author.findById(req.body.author)
  //   .then(author => {
  //     author.user.push(user)
  //     author.save()
  //     res.redirect("/author/index")
  //   })
  //   .catch( err => {
  //     console.log(err)
  //   })
}

exports.user_index_get = (req, res) => {
  User.findById(req.user._id)
    .then((users) => {
      res.render('user/index', { users, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_show_get = (req, res) => {
  console.log(req.query.id)
  User.findById(req.query.id)
    .then((user) => {
      res.render('user/detail', { user, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_edit_get = (req, res) => {
  console.log(req.query.id)
  User.findById(req.query.id)
    .then((user) => {
      res.render('user/edit', { user })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_update_post = (req, res) => {
  console.log(req.body.id)
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/user/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_delete_get = (req, res) => {
  console.log(req.body.id)
  User.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/layout')
    })
    .catch((err) => {
      console.log(err)
    })
}
// tracking user
exports.user_Tracking_show_get = (req, res) => {
  const userId = req.user._id; // Assuming user ID is passed in the query

  Tracking.find({ user: userId })
    .populate('exercise') // Populate exercise details if needed
    .then((trackingRecords) => {
      // Pass the data to the view
      res.render('user/track', { trackingRecords });
    })
    .catch((err) => {
      console.log(err);
    });
};