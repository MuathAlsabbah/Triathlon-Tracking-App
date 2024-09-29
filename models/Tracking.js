const mongoose = require('mongoose')

const trackingSchema = mongoose.Schema(

    {
        duration: Number,
        distance:Number,
        calories_burned:Number,
        date: date(),
        user:[{          
        type: mongoose.Schema.Types.ObjectId,
         ref :'User' 
            }],

        exercise:[{           
         type: mongoose.Schema.Types.ObjectId,
         ref :'Exercise' 
            }],

    },
    {
      timestamps: true //means createdAt and updatedAt
    }


    exercise: [exerciseSchema]
  },
  {
    timestamps: true //means createdAt and updatedAt
  }
)
module.exports = mongoose.model('Tracking', trackingSchema)
