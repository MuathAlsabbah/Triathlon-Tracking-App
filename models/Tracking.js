const mongoose = require('mongoose')

const trackingSchema = mongoose.Schema(
  {
    duration: Number,
    distance: Number,
    calories_burned: Number,
    date: Date,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    exercise: [exerciseSchema]
  },
  {
    timestamps: true //means createdAt and updatedAt
  }
)
module.exports = mongoose.model('Tracking', trackingSchema)
