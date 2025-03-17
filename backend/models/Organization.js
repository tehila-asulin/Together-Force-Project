const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({

  name: String,
  email:String, 
  phone:String,
  history:String,
  image:String,
  password:String,
  AssociationNumber:Number
});
module.exports = mongoose.model('Organization', organizationSchema);