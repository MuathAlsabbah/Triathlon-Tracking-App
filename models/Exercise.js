const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty_level: String,
    duration: { type: Number, required: true }, // duration in minutes
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true //means createdAt and updatedAt
  }
)
module.exports = mongoose.model('Exercise', exerciseSchema)
