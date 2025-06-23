const express = require("express");
const router = express.Router();

const { registerStudent, loginStudent, logoutStudent } = require("../controllers/authStudentController");

router.post("/auth/student/registerStudent", registerStudent);
router.post("/auth/student/loginStudent", loginStudent);
router.post("/auth/student/logoutStudent", logoutStudent);

module.exports = router;