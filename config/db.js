// Load dependincess
const mongoose = require('mongoose')

// MongoDB connection
mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    // console.log('MongoDB Connected')
    const db = mongoose.connection
    console.log(
      `MongoDB Connected to Database: ${db.name} at Host: ${db.host} on PORT: ${db.port}`
    )
  })
  .catch((err) => {
    console.log(`MongoDB not connected ${err}`)
  })
