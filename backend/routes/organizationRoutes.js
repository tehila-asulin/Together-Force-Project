// // const express = require('express');
// // const verifyJWT = require("../middleware/verifyJWT")
// // const {addOrganization,deleteOrganization,updateOrganization,getAllOrganizations,getOrganizationById} = require('../controllers/organizationController');

// // const router = express.Router();

// // //const Organization = require("../models/Organization");
// // router.post('/SignUpO', addOrganization);
// // router.delete('/:id',verifyJWT, deleteOrganization);
// // router.put('/:id', verifyJWT,updateOrganization);
// // router.get('/allOrganizations',verifyJWT,getAllOrganizations)
// // router.get('/:id',verifyJWT,getOrganizationById)

// // module.exports = router;
// const express = require('express');
// const verifyJWT = require("../middleware/verifyJWT");
// const {
//   addOrganization,
//   deleteOrganization,
//   updateOrganization,
//   getAllOrganizations,
//   getOrganizationById
// } = require('../controllers/organizationController');

// const upload = require("../middleware/upload"); // multer for file handling

// const router = express.Router();

// // שימוש ב-upload.single("profileImage") כדי לתפוס את קובץ התמונה
// router.post('/SignUpO', upload.single("profileImage"), addOrganization);
// router.delete('/:id', verifyJWT, deleteOrganization);
// router.put('/:id', verifyJWT, updateOrganization);
// router.get('/allOrganizations', verifyJWT, getAllOrganizations);
// router.get('/:id', verifyJWT, getOrganizationById);

// module.exports = router;
const express = require('express');
const verifyJWT = require("../middleware/verifyJWT");
const {
  addOrganization,
  deleteOrganization,
  updateOrganization,
  getAllOrganizations,
  getOrganizationById
} = require('../controllers/organizationController');

const upload = require("../middleware/upload");

const router = express.Router();

router.post('/SignUpO', upload.single("profileImage"), addOrganization);
router.delete('/:id', verifyJWT, deleteOrganization);
router.put('/:id', verifyJWT, updateOrganization);
router.get('/allOrganizations', verifyJWT, getAllOrganizations);
router.get('/:id', verifyJWT, getOrganizationById);

module.exports = router;
