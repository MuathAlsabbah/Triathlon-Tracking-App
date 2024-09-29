const passport = require('passport')

exports.login_auth_google = passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    prompt: 'select_account'
  }
)

exports.callback_auth_google = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/article/index'
})

exports.logout_auth_google = (req, res) => {
  req.logout(function () {
    res.redirect('/')
  })
}
