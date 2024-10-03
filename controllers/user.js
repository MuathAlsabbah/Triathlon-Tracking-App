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
const Tracking = require('../models/Tracking')
const TrainingPlan = require('../models/TrainingPlan')
const Exercise = require('../models/Exercise') // Since you are populating 'exercise'

// image file  dependincess
const multer = require('multer');
const path = require('path'); // Add this line to import the path module

// Set up multer storage (as shown previously)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer
const upload = multer({ storage: storage }).single('profile_picture'); // Expecting a single file upload with field name 'image'

// --------------

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
      req.body.user.forEach((user) => {
        Author.findById(author)
          .then((author) => {
            author.user.push(user)
            author.save
          })
          .catch((err) => {
            console.log(err)
          })
      })
      res.redirect('/user/index')
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
  // Handle file upload
  upload(req, res, (err) => {
    if (err) {
      console.log("File upload error:", err);
      return res.send('Error uploading file');
    }
    if (req.file) {
          // Add the image path to req.body
      req.body.profile_picture = req.file.filename;
    }

  console.log(req.body.id)
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/user/index')
    })
    .catch((err) => {
      console.log(err)
    })
  });
}

exports.user_delete_get = (req, res) => {
  console.log(req.body.id)
  User.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

// tracking user
exports.user_Tracking_show_get = (req, res) => {
  const userId = req.user._id
  Promise.all([
    TrainingPlan.find(),
    Tracking.find({ user: userId }).populate('exercise')
  ])
    .then(([trainingPlan, tracking]) => {
      // const chartDataRes = getUserProgress(req, res)

      // Prepare the chartData from the tracking records
      const chartData = tracking.map((track) => ({
        date: new Date(track.date).toLocaleDateString(),
        calories: track.calories_burned || 0
      }))

      console.log('Chart Data:', chartData)

      res.render('user/track', { trainingPlan, tracking, chartData })
    })
    .catch((err) => {
      console.log(err)
    })
}

const getUserProgress = (req, res) => {
  const userId = req.user._id
  // Find all tracking data for the user and populate exercises
  Tracking.find({ user: userId })
    .populate('exercise')
    .then((tracking) => {
      console.log('tracking', tracking)
      // Prepare the chartData from the tracking records
      const chartData = tracking.map((track) => ({
        date: new Date(track.date).toLocaleDateString(),
        calories: track.calories_burned || 0
      }))

      return chartData
      // Render the 'track' view and pass both tracking and chartData
      // res.render('track', { tracking, chartData })
    })
    .catch((err) => {
      console.error('Error fetching user progress:', err)
      res.status(500).send('Error retrieving progress')
    })
}
