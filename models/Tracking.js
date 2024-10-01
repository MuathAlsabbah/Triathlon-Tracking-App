const mongoose = require('mongoose')
const { userSchema } = require('./User')
const { exerciseSchema } = require('./Exercise')

const trackingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    trainingPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingPlan',
      required: true
    },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'], // Current enum values
      default: 'pending'
    },
    notes: { type: String },
    duration: { type: Number, required: true },
    calories_burned: { type: Number, required: true }
  },
  {
    timestamps: true //means createdAt and updatedAt
  }
)
module.exports = mongoose.model('Tracking', trackingSchema)
