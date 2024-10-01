const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensuredLoggedIn = require('../config/ensureLoggedIn')

// Controller
const userCtrl = require('../controllers/user')

// Routes
router.get('/add', ensuredLoggedIn, userCtrl.user_create_get)
router.post('/add', ensuredLoggedIn, userCtrl.user_create_post)

router.get('/index', userCtrl.user_index_get)
router.get('/detail', userCtrl.user_show_get)

router.get('/delete', ensuredLoggedIn, userCtrl.user_delete_get)
router.get('/edit', ensuredLoggedIn, userCtrl.user_edit_get)
router.post('/update', ensuredLoggedIn, userCtrl.user_update_post)
router.get('/track', ensuredLoggedIn, userCtrl.user_Tracking_show_get)

module.exports = router
