
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        age: Number,
        gender: String,
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
    }

)
const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema};
