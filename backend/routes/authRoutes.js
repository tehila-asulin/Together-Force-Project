const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/loginV", authController.loginV);
router.post("/registerV", authController.registerV);

module.exports = router;
