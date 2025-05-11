// const mongoose = require('mongoose');
// const volunteeringSchema = require('./Volunteering'); 

// const organizationSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   profileImage: String,
//   password: String,
//   organizationNumber: Number,
//   history: [volunteeringSchema] 
// });

// module.exports = mongoose.model('Organization', organizationSchema);
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  profileImage: String,
  password: String,
  organizationNumber: Number,
  history: [{
    title: String,
    description: String,
    origin: [String],
    phone: String,
    isDone: Boolean
  }]
});

module.exports = mongoose.model('Organization', organizationSchema);
