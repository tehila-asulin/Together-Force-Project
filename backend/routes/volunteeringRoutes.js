const express = require('express');
const {addVolunteering,deleteVolunteeing,updateVolunteering,getAllVolunteering,getVolunteeringById}= require('../controllers/volunteeringController');
const router = express.Router();
//const Volunteering = require("../models/Volunteering");
router.post('/addVolunteering', addVolunteering);
router.delete('/:id', deleteVolunteeing);
router.put('/:id', updateVolunteering);
router.get('/allVolunteering',getAllVolunteering)
router.get('/:id',getVolunteeringById)
module.exports = router;