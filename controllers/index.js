exports.index_get = (req, res) => {
  // res.send('Welcome to Recipe App')
  res.render('home/index', {
    welcomeMessage: 'Welcome to Our Triathlon TrackingApp'
  })
}
