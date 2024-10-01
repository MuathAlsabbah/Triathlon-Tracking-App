
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    age: Number,
    gender: String,
    profile_picture: String,
    // role:  String,
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
=======
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        age:{
            type: Number, default: null
        },
        gender:{
            type: String, default: null
        },
        profile_picture: String,
        role:  String,
        event:[{            //poplute('event')
        type: mongoose.Schema.Types.ObjectId,
        ref :'Event' 
        }],
        googleId:{
            type:String,
            required:true
        }

    },
    {
      timestamps: true //means createdAt and updatedAt


const User = mongoose.model('User', userSchema)
module.exports = { User, userSchema }
