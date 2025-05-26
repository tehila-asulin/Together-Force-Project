const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router();

module.exports = (organizationController) => {
router.post('/SignUpO', organizationController.addOrganization);
router.delete('/:id',verifyJWT, organizationController.deleteOrganization);
router.put('/:id', verifyJWT,organizationController.updateOrganization);
router.get('/allOrganizations',verifyJWT,organizationController.getAllOrganizations)
router.get('/:id',verifyJWT,organizationController.getOrganizationByNumber)
  return router;
}



