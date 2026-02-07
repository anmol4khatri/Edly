const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth); // All enrollment routes require login

router.post("/enroll", enrollmentController.enroll);
router.get("/my-courses", enrollmentController.getMyEnrollments);
router.get("/course/:courseId", enrollmentController.getEnrolledCourseContent);

module.exports = router;
