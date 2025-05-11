const mongoose = require('mongoose');

const volunteeringSchema = new mongoose.Schema({

  title: String,
  description:String, 
  origin:[String],
  phone:String,
  isDone:Boolean,
  feedback:Number,
  idMaker:String,

});
module.exports = mongoose.model('Volunteering', volunteeringSchema);