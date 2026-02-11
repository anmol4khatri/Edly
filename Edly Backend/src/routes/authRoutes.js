import express from "express";
const router = express.Router();
import * as authController from "#controllers/authController.js";
import resolveTenant from "#middlewares/resolveTenant.js";

// Apply tenant resolution to all auth routes
router.use(resolveTenant);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
