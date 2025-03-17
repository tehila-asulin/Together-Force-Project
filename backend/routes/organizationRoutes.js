const express = require('express');
const {addOrganization,deleteOrganization,updateOrganization,getAllOrganizations,getOrganizationById} = require('../controllers/organizationController');
const router = express.Router();
//const Organization = require("../models/Organization");
router.post('/SignUpO', addOrganization);
router.delete('/:id', deleteOrganization);
router.put('/:id', updateOrganization);
router.get('/allOrganizations',getAllOrganizations)
router.get('/:id',getOrganizationById)

module.exports = router;
