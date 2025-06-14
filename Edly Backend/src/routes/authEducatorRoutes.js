const express = require("express");


const router = express.Router();
const { registerEducator } = require("../controllers/authEducatorControllers");

router.post("/auth/educator/registerEducator", registerEducator);

module.exports = router;