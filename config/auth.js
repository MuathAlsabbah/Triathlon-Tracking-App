exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}

exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') return next()
  res.redirect('/dashboard')
}
