const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name:String,	
    email:String,
    Skills: [String],
    Origins:[String],
    phone:String,
    history:[String],
    image:String,
    id:String
  
});

module.exports = mongoose.model('Volunteer', volunteerSchema);