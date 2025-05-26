// const express = require('express');
// const { addVolunteering, deleteVolunteeing, updateVolunteering, getAllVolunteering, getVolunteeringById,getFilteredVolunteering, } = require('../controllers/volunteeringController');
// const router = express.Router();


// router.post('/addVolunteering', addVolunteering);
// router.delete('/:id', deleteVolunteeing);
// router.put('/:id', updateVolunteering);
// router.get('/allVolunteering', getAllVolunteering); 
// router.get('/:id', getVolunteeringById);
// router.post('/filtered', getFilteredVolunteering);

// module.exports = router;
const express = require('express');
const router = express.Router();

module.exports = (volunteeringController) => {
  router.post('/filter', volunteeringController.getFilteredVolunteering);
  router.post('/addVolunteering', volunteeringController.addVolunteering);
  router.delete('/:id', volunteeringController.deleteVolunteering);
  router.put('/:id', volunteeringController.updateVolunteering);
  router.get('/allVolunteering', volunteeringController.getAllVolunteering);
  router.get('/:id', volunteeringController.getVolunteeringById);

  return router;
};
