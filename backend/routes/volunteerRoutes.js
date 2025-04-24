const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const {addVolunteer,deleteVolunteer,updateVolunteer,getAllVolunteers,getVolunteerById} = require('../controllers/volunteerController');
const router = express.Router();
//const Volunteer = require("../models/Volunteer");
router.post('/signUpV', addVolunteer);
router.delete('/:id', verifyJWT,deleteVolunteer);
router.put('/:id',verifyJWT, updateVolunteer);
router.get('/allVolunteers',verifyJWT,getAllVolunteers)
router.get('/:id',verifyJWT,getVolunteerById)
module.exports = router;
