const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    selectedVolunteerOptions: { type: [String], default: [] }, // מערך של מחרוזות
    selectedCities: { type: [String], default: [] }, // מערך של מחרוזות
    phone: { type: String, required: true },
    history: { type: [String], default: [] }, // היסטוריה - רשימה של מחרוזות
    profileImage: { type: String },
    idNumber:{ type: String, required: true, unique: true },
    password: { type: String, required: true }
});

  
module.exports = mongoose.model('Volunteer', volunteerSchema);