const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensureLoggedIn = require('../config/ensureLoggedIn')

// Controller
const exerciseCtrl = require('../controllers/exercise')

// Routes
router.get('/add', ensureLoggedIn, exerciseCtrl.exercise_create_get)
router.post('/add', ensureLoggedIn, exerciseCtrl.exercise_create_post)

router.get('/index', exerciseCtrl.exercise_index_get)
router.get('/detail', exerciseCtrl.exercise_show_get)

router.get('/edit', ensureLoggedIn, exerciseCtrl.exercise_edit_get)
router.post('/update', ensureLoggedIn, exerciseCtrl.exercise_update_post)

router.get('/delete', ensureLoggedIn, exerciseCtrl.exercise_delete_get)

module.exports = router
