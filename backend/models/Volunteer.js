const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    selectedVolunteerOptions: { type: [String], default: [] },
    selectedCities: { type: [String], default: [] }, 
    phone: { type: String, required: true },
   
    profileImage: String ,
    idNumber:{ type: String, required: true, unique: true },
    password: { type: String, required: true }
});

  
module.exports = mongoose.model('Volunteer', volunteerSchema);