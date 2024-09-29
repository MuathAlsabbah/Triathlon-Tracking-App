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

// Look in views folder for a file named layout.ejs
app.use(expressLayouts)

// Passport and Session configurations
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Share the information with other pages
app.use(function (req, res, next){
  res.locals.user = req.user;
  next();
});

// Import Routes
const indexRouter = require('./routes/index')

// Mount Routes
app.use('/', indexRouter)

// Listen for all HTTP Requests on PORT 4000
app.listen(PORT, () => {
  console.log(`Triathlon-Tracking App is running on PORT ${PORT}`)
})
