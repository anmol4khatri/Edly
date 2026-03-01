import express from 'express';
const router = express.Router();
import * as tenantController from '#controllers/tenantController.js';
import requireAuth from '#middlewares/requireAuth.js';
import { asyncHandler } from '#utils/asyncHandler.js';

// Public
router.get('/settings', asyncHandler(tenantController.getTenantDetails));

// Protected
router.put(
  '/settings',
  asyncHandler(requireAuth),
  asyncHandler(tenantController.updateTenantSettings)
);

export default router;
