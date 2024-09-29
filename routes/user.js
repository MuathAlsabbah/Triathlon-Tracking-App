const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensuredLoggedIn = require('../config/ensureLoggedIn')

// Controller
const profileCtrl = require('../controllers/profile')

// Routes
router.get('/add', ensuredLoggedIn, profileCtrl.profile_create_get)
router.post('/add', ensuredLoggedIn, profileCtrl.profile_create_post)

router.get('/index', profileCtrl.profile_index_get)
router.get('/detail', profileCtrl.profile_show_get)

router.get('/delete', ensuredLoggedIn, profileCtrl.profile_delete_get)
router.get('/edit', ensuredLoggedIn, profileCtrl.profile_edit_get)
router.post('/update', ensuredLoggedIn, profileCtrl.profile_update_post)

module.exports = router
