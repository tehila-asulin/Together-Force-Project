const mongoose = require('mongoose');

const statusV = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

const volunteeringSchema = new mongoose.Schema({
  title: String,
  description: String,
  origin: String,
  phone: String,
  idMaker: String,
  status: {
    type: String,
    enum: Object.values(statusV),
    default: statusV.PENDING
  },
    rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null, 
  },
  byOrganizationNumber: Number,
  madeByVolunteerEmail: String,
  deadline: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteering', volunteeringSchema);
