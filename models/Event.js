const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    event_name: String,
    event_date: Date,
    time:String,
    location: String,
    description: String,
    image: String,
    isFull:Boolean,
    max_participants: Number,
    user:[{            //poplute('user')
     type: mongoose.Schema.Types.ObjectId,
     ref :'User' 
        }],
},
{
  timestamps: true //means createdAt and updatedAt
}

)
module.exports = mongoose.model('Event',eventSchema);






