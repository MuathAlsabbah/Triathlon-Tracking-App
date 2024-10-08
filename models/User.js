const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    age: {
      type: Number,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    profile_picture:{type :String, default:'null'},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    event: [
      {
        //poplute('event')
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    trainingPlan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingPlan'
      }
    ],
    googleId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true //means createdAt and updatedAt
  }
)

const User = mongoose.model('User', userSchema)
module.exports = { User, userSchema }
