const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// רישום משתמש עם העלאת תמונה (השתמש ב-Cloudinary במקום Multer)
router.post("/register", authController.register);  // אין צורך ב-upload.single("profileImage")

// שאר הנתיבים
router.post("/login", authController.login);
router.post("/loginV", authController.loginV);
router.post("/registerV", authController.registerV);

module.exports = router;
