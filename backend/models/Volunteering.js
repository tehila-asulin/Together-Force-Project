const mongoose = require('mongoose');

const volunteeringSchema = new mongoose.Schema({
  title: String,
  description: String,
  origin: String,
  phone: String,
  isDone: Boolean,
  feedback: Number,
  idMaker: String,
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'],
    default: 'PENDING'
  },
  byOrganizationNumber: Number,
  madeByVolunteerEmail: String,
  deadline: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteering', volunteeringSchema);