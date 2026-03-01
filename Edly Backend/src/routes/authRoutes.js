import express from 'express';
const router = express.Router();
import * as authController from '#controllers/authController.js';
import resolveTenant from '#middlewares/resolveTenant.js';
import { asyncHandler } from '#utils/asyncHandler.js';

// Apply tenant resolution to all auth routes
router.use(asyncHandler(resolveTenant));

router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/logout', authController.logout);

export default router;
