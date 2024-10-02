const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensuredLoggedIn = require('../config/ensureLoggedIn')

// Controller
const trackingCtrl = require('../controllers/tracking')

// Routes

// router.get('/track', ensuredLoggedIn, trackingCtrl.getUserProgress)

module.exports = router
