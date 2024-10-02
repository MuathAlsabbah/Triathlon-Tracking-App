const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensureLoggedIn = require('../config/ensureLoggedIn')

// Controller
const eventCtrl = require('../controllers/event')

// Routes
router.get('/add', ensureLoggedIn, eventCtrl.event_create_get)
router.post('/add', ensureLoggedIn, eventCtrl.event_create_post)

router.get('/index', ensureLoggedIn, eventCtrl.event_index_get)
router.get('/detail', ensureLoggedIn, eventCtrl.event_show_get)
router.get('/userShowEvent',  ensureLoggedIn,eventCtrl.event_user_get)


router.get('/edit', ensureLoggedIn, eventCtrl.event_edit_get)
router.post('/update', ensureLoggedIn, eventCtrl.event_update_post)

router.get('/delete', ensureLoggedIn, eventCtrl.event_delete_get)
router.get('/userJoinEvent', ensureLoggedIn, eventCtrl.event_join_get)
router.get('/userUNJoinEvent', ensureLoggedIn, eventCtrl.event_Unjoin_get)
router.get('/eventDetail', ensureLoggedIn, eventCtrl.user_event_show_get)


module.exports = router
