const express = require('express');
const { addVolunteering, deleteVolunteeing, updateVolunteering, getAllVolunteering, getVolunteeringById,getFilteredVolunteering, } = require('../controllers/volunteeringController');
const router = express.Router();


router.post('/addVolunteering', addVolunteering);
router.delete('/:id', deleteVolunteeing);
router.put('/:id', updateVolunteering);
router.get('/allVolunteering', getAllVolunteering); 
router.get('/:id', getVolunteeringById);
router.post('/filtered', getFilteredVolunteering);

module.exports = router;
