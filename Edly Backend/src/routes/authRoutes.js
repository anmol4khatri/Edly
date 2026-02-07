const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const resolveTenant = require("../middlewares/resolveTenant");

// Apply tenant resolution to all auth routes
router.use(resolveTenant);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
