const express = require('express');

const router = express.Router();

// Controller
const authCtrl = require("../controllers/auth");

// Routes

// Google OAuth login route
router.get('/auth/google', authCtrl.login_auth_google);

// Google OAuth callback route
router.get('/oauth2callback', authCtrl.callback_auth_google);

// OAuth logout route
router.get('/logout', authCtrl.logout_auth_google);

module.exports = router;