import express from "express";
const router = express.Router();
import * as tenantController from "#controllers/tenantController.js";
import requireAuth from "#middlewares/requireAuth.js";

// Public
router.get("/settings", tenantController.getTenantDetails);

// Protected
router.put("/settings", requireAuth, tenantController.updateTenantSettings);

export default router;
