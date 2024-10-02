// Load Dependencies
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')

// Require and Initialize dotenv
require('dotenv').config()

// PORT Configuration
const PORT = process.env.PORT

// Initialize Express
const app = express()

// Look for static file in the public folder.
// (CSS, JS,  Image, Video, Audio)
app.use(express.static('public'))

// Database Configuration
const db = require('./config/db')
require('./config/passport')

// Nodejs to look in a folder called views for all the ejs files
app.set('view engine', 'ejs')

app.set('layout')

app.use(express.urlencoded({ extended: true })) // To parse form data
app.use(express.json()) // To parse JSON data

// Look in views folder for a file named layout.ejs
app.use(expressLayouts)

// Passport and Session configurations
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Share the information with other pages
app.use(function (req, res, next) {
  console.log('req.user', req.user)
  res.locals.user = req.user
  next()
})

// Import Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const exerciseRouter = require('./routes/exercise')
const trainingPlansRouter = require('./routes/trainingPlans')
const eventRouter = require('./routes/event')
const userRouter = require('./routes/user')

// Mount Routes
app.use('/', indexRouter)
app.use('/', authRouter)

app.use('/admin/exercise', exerciseRouter)
app.use('/admin/trainingPlans', trainingPlansRouter)

app.use('/exercise', exerciseRouter)
app.use('/event', eventRouter)
app.use('/user', userRouter)
app.use('/track', userRouter)

// Listen for all HTTP Requests on PORT 4000
app.listen(PORT, () => {
  console.log(`Triathlon-Tracking App is running on PORT ${PORT}`)
})
