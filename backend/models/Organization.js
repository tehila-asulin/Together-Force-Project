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
  organizationNumber: Number
});

module.exports = mongoose.model('Organization', organizationSchema);
