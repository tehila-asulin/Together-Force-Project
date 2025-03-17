const express = require('express');
const {addVolunteer,deleteVolunteer,updateVolunteer,getAllVolunteers,getVolunteerById} = require('../controllers/volunteerController');
const router = express.Router();
//const Volunteer = require("../models/Volunteer");
router.post('/signUpV', addVolunteer);
router.delete('/:id', deleteVolunteer);
router.put('/:id', updateVolunteer);
router.get('/allVolunteers',getAllVolunteers)
router.get('/:id',getVolunteerById)
module.exports = router;
