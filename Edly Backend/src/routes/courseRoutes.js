import express from "express";
const router = express.Router();
import * as courseController from "#controllers/courseController.js";
import * as moduleController from "#controllers/moduleController.js";
import requireAuth from "#middlewares/requireAuth.js";
import { asyncHandler } from "#utils/asyncHandler.js";

// Courses
router.get("/", asyncHandler(courseController.getAllCourses)); // Public listing
router.get("/:courseId", asyncHandler(courseController.getCourseById)); // Public details (potentially limited)
router.post("/", asyncHandler(requireAuth), asyncHandler(courseController.createCourse));
router.put("/:courseId", asyncHandler(requireAuth), asyncHandler(courseController.updateCourse));
router.delete("/:courseId", asyncHandler(requireAuth), asyncHandler(courseController.deleteCourse));

// Modules & Content
router.get("/:courseId/modules", asyncHandler(moduleController.getAllModulesByCourse));
router.post("/:courseId/modules", asyncHandler(requireAuth), asyncHandler(moduleController.createModule));
router.delete("/:courseId/modules/:moduleId", asyncHandler(requireAuth), asyncHandler(moduleController.deleteModule));

router.post("/:courseId/modules/:moduleId/content", asyncHandler(requireAuth), asyncHandler(moduleController.addContent));
router.delete("/:courseId/modules/:moduleId/content/:type/:refId", asyncHandler(requireAuth), asyncHandler(moduleController.deleteContent));

export default router;
