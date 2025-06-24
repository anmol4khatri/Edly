const express = require("express");
const router = express.Router();

const resolveEducatorFromSubdomain = require("../middlewares/resolveEducatorFromSubdomain");
const { registerStudent, loginStudent, logoutStudent } = require("../controllers/authStudentController");

router.post("/auth/student/registerStudent", resolveEducatorFromSubdomain, registerStudent);
router.post("/auth/student/loginStudent", resolveEducatorFromSubdomain, loginStudent);
router.post("/auth/student/logoutStudent", logoutStudent);

module.exports = router;