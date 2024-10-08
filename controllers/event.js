const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Event = require('../models/Event')
const { User } = require('../models/User')



// image file  dependincess
const multer = require('multer');
const path = require('path'); // Add this line to import the path module

// Set up multer storage (as shown previously)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer
const upload = multer({ storage: storage }).single('image'); // Expecting a single file upload with field name 'image'

// --------------

exports.event_create_get = (req, res) => {
  res.render('event/add')
}
// 
exports.event_create_post = (req, res) => {
    // Handle file upload
    upload(req, res, (err) => {
      if (err) {
        console.log("File upload error:", err);
        return res.send('Error uploading file');
      }
  
      // Add the image path to req.body
      req.body.image = req.file ? req.file.filename : null;
  
      // Create a new event instance using req.body
      let event = new Event(req.body);
  
      // Save the event
      event
        .save()
        .then(() => {
          res.redirect('/event/index'); // Redirect to the event index page after successful creation
        })
        .catch((err) => {
          console.log(err);
          res.send('Please try again later!!!');
        });
    });
  };
// 

exports.event_index_get = (req, res) => {
  Event.find()
    .then((event) => {
      res.render('event/index', { event, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.event_user_get = (req, res) => {
    Event.find().populate('user') 
      .then((event) => {
        res.render('event/userShowEvent', { event, dayjs })
      })
      .catch((err) => {
        console.log(err)
      })
  }



exports.event_show_get = (req, res) => {
  console.log(req.query.id)
  Event.findById(req.query.id).populate('user')
    .then((event) => {
        console.log("image event", event.image); // Log the image value here
      res.render('event/detail', {
        event,
        dayjs
      })
    })
    .catch((err) => {
      console.log(err)
    })
}


exports.event_edit_get = (req, res) => {
  console.log(req.query.id)
  Event.findById(req.query.id)
    .then((event) => {
      res.render('event/edit', { event })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.event_update_post = (req, res) => {
  console.log(req.body.id)
  Event.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/event/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.event_delete_get = (req, res) => {
  console.log(req.query.id)
  Event.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/event/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
// Users join event 
exports.event_join_get = async (req, res) => {
  const eventId = req.query.id; // eventId
  const userId = req.user._id; // user id

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);

    // Add the user to the event's participants
    event.user.push(userId);
    await event.save();

    // Find the user and add the event to the user's events
    const user = await User.findById(userId);
    user.event.push(eventId);
    await user.save();

    // Redirect after successful join
    res.redirect('/event/userShowEvent');
  } catch (err) {
    console.log(err);
  }
};

// Users UNjoin event 
exports.event_Unjoin_get = async (req, res) => {
  const eventId = req.query.id; // eventId
  const userId = req.user._id; // user id

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);

    // Add the user to the event's participants  > pull to remove 
    event.user.pull(userId);
    await event.save();

    // Find the user and add the event to the user's events
    const user = await User.findById(userId);
    user.event.pull(eventId);
    await user.save();

    // Redirect after successful join
    res.redirect('/event/userShowEvent');
  } catch (err) {
    console.log(err);
  }
};
//
exports.user_event_show_get = (req, res) => {
  console.log(req.query.id)
  Event.findById(req.query.id).populate('user')
    .then((event) => {
      res.render('event/eventDetail', {
        event,
        dayjs
      })
    })
    .catch((err) => {
      console.log(err)
    })
}