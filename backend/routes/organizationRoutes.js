const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const {addOrganization,deleteOrganization,updateOrganization,getAllOrganizations,getOrganizationById,getOrganizationByNumber} = require('../controllers/organizationController');

const router = express.Router();

//const Organization = require("../models/Organization");
router.post('/SignUpO', addOrganization);
router.delete('/:id',verifyJWT, deleteOrganization);
router.put('/:id', verifyJWT,updateOrganization);
router.get('/allOrganizations',verifyJWT,getAllOrganizations)
router.get('/:id',verifyJWT,getOrganizationByNumber)

module.exports = router;


