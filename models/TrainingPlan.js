const mongoose = require('mongoose')

const trainingPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema)
module.exports = TrainingPlan
