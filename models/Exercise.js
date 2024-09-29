const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
    {
        exercise_name: String,
        exercise_type: String,
        average_pace: Number,
        average_speed: Number,
        calories_per_hour:Number,
        difficulty_level:String
    },
    {
      timestamps: true //means createdAt and updatedAt
    }

)

module.exports = mongoose.model('Exercise',exerciseSchema)

