// const express = require('express');
// const verifyJWT = require("../middleware/verifyJWT")
// const {addVolunteer,deleteVolunteer,updateVolunteer,getAllVolunteers,getVolunteerById} = require('../controllers/volunteerController');
// const router = express.Router();
// //const Volunteer = require("../models/Volunteer");
// router.post('/signUpV', addVolunteer);
// router.delete('/:id', verifyJWT,deleteVolunteer);
// router.put('/:id',verifyJWT, updateVolunteer);
// router.get('/allVolunteers',verifyJWT,getAllVolunteers)
// router.get('/:id',verifyJWT,getVolunteerById)
// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer
} = require('../controllers/volunteerController');

// הגדרת אחסון הקובץ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // תקייה מקומית
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// הוספת מתנדב עם העלאת תמונה
router.post('/addVolunteer', upload.single('profileImage'), addVolunteer);

// שאר הפעולות
router.get('/allVolunteers', getAllVolunteers);
router.get('/:id', getVolunteerById);
router.put('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);

module.exports = router;
