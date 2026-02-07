const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");
const requireAuth = require("../middlewares/requireAuth");

// Public
router.get("/settings", tenantController.getTenantDetails);

// Protected
router.put("/settings", requireAuth, tenantController.updateTenantSettings);

module.exports = router;
