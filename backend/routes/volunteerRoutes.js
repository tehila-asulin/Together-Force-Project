const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router();
module.exports = (volunteerController) => {
router.post('/signUpV', volunteerController.addVolunteer);
router.delete('/:id', verifyJWT,volunteerController.deleteVolunteer);
router.put('/:id',verifyJWT, volunteerController.updateVolunteer);
router.get('/allVolunteers',verifyJWT,volunteerController.getAllVolunteers)
router.get('/:id',verifyJWT,volunteerController.getVolunteerById)
return router
}

  