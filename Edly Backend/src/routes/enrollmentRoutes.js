import express from "express";
const router = express.Router();
import * as enrollmentController from "#controllers/enrollmentController.js";
import requireAuth from "#middlewares/requireAuth.js";
import { asyncHandler } from "#utils/asyncHandler.js";

router.use(asyncHandler(requireAuth)); // All enrollment routes require login

router.post("/enroll", asyncHandler(enrollmentController.enroll));
router.get("/my-courses", asyncHandler(enrollmentController.getMyEnrollments));
router.get("/course/:courseId", asyncHandler(enrollmentController.getEnrolledCourseContent));

export default router;
