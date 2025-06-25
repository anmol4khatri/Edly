const express = require("express");
const router = express.Router();

const requireStudentAuth = require("../middlewares/requireStudentAuth");
const resolveEducatorFromSubdomain = require("../middlewares/resolveEducatorFromSubdomain");
const getCoursesWithEnrollmentStatus = require("../controllers/getCoursesWithEnrollmentStatus");
const getCoursePreview = require("../controllers/getCoursePreview");

// Get all courses with Enrollment Status ("isEnrolled" Flag)
router.get("/student/courses",
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    getCoursesWithEnrollmentStatus
);

// Get complete course detail of a specific course
router.get("/student/preview/:courseId", requireStudentAuth, resolveEducatorFromSubdomain, getCoursePreview);

module.exports = router;