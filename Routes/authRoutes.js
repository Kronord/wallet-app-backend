const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  registrationController,
  loginController,
  logoutController,
} = require("../Controllers/authController");
const router = express.Router();

router.post('/registration', registrationController);
router.post('/login', loginController);
router.get('/logout', authMiddleware, logoutController);

module.exports = router;
