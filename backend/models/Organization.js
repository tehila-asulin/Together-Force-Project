const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({

  organizationName: String,
  email:String, 
  phone:String,
  history:String,
  profileImage:String,
  password:String,
  organizationNumber:Number
});
module.exports = mongoose.model('Organization', organizationSchema);
 