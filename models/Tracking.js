
const mongoose = require('mongoose');
const {userSchema} = require('./User');
const {exerciseSchema} = require('./Exercise');

const trackingSchema = mongoose.Schema(
    {
        duration: Number,
        distance:Number,
        calories_burned:Number,
        date:Date,
        // user: [userSchema],
        // exercise:[exerciseSchema],
        user:{ type: mongoose.Schema.Types.ObjectId },
        exercise:{ type: mongoose.Schema.Types.ObjectId },

    

    },
    {
      timestamps: true //means createdAt and updatedAt
    }

)
module.exports = mongoose.model('Tracking',trackingSchema);
