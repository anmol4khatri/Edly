import express from "express";
const router = express.Router();
import * as enrollmentController from "#controllers/enrollmentController.js";
import requireAuth from "#middlewares/requireAuth.js";

router.use(requireAuth); // All enrollment routes require login

router.post("/enroll", enrollmentController.enroll);
router.get("/my-courses", enrollmentController.getMyEnrollments);
router.get("/course/:courseId", enrollmentController.getEnrolledCourseContent);

export default router;
