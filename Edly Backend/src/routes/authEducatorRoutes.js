const express = require("express");
const router = express.Router();

const { registerEducator, loginEducator, logoutEducator } = require("../controllers/authEducatorControllers");

router.post("/auth/educator/registerEducator", registerEducator);
router.post("/auth/educator/loginEducator", loginEducator);
router.post("/auth/educator/logoutEducator", logoutEducator);

module.exports = router;