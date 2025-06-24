const express = require("express");
const router = express.Router();

const requireStudentAuth = require("../middlewares/requireStudentAuth");
const resolveEducatorFromSubdomain = require("../middlewares/resolveEducatorFromSubdomain");
const getCoursesWithEnrollmentStatus = require("../controllers/getCoursesWithEnrollmentStatus");

router.get("/student/courses",
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    getCoursesWithEnrollmentStatus
);

module.exports = router;