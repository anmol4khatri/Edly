const express = require("express");
const router = express.Router();

const requireStudentAuth = require("../middlewares/requireStudentAuth");
const resolveEducatorFromSubdomain = require("../middlewares/resolveEducatorFromSubdomain");
const getCoursesWithEnrollmentStatus = require("../controllers/getCoursesWithEnrollmentStatus");
const getCoursePreview = require("../controllers/getCoursePreview");
const getEnrolledCourse = require("../controllers/getEnrolledCourse");
const enrollInCourse  = require("../controllers/enrollInCourse");

// Get all courses with Enrollment Status ("isEnrolled" Flag)
router.get("/student/courses",
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    getCoursesWithEnrollmentStatus
);

// Get complete course detail of a specific course
router.get("/student/preview/:courseId", // for students who are not enrolled into the course
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    getCoursePreview
);
router.get("/student/course/:courseId", // for students who are enrolled into the course
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    getEnrolledCourse
);

router.post("/student/course/enroll",
    requireStudentAuth,
    resolveEducatorFromSubdomain,
    enrollInCourse
);

module.exports = router;