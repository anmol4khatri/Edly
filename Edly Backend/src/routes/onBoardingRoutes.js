const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const completeOnboarding = require("../controllers/completeOnboarding");

router.put("/educator/onboarding", requireEducatorAuth, completeOnboarding);

module.exports = router;