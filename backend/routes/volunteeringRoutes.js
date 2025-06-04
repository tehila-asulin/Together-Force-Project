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
