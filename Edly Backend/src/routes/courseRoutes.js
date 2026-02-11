import express from "express";
const router = express.Router();
import * as courseController from "#controllers/courseController.js";
import * as moduleController from "#controllers/moduleController.js";
import requireAuth from "#middlewares/requireAuth.js";

// Courses
router.get("/", courseController.getAllCourses); // Public listing
router.get("/:courseId", courseController.getCourseById); // Public details (potentially limited)
router.post("/", requireAuth, courseController.createCourse);
router.put("/:courseId", requireAuth, courseController.updateCourse);
router.delete("/:courseId", requireAuth, courseController.deleteCourse);

// Modules & Content
router.get("/:courseId/modules", moduleController.getAllModulesByCourse);
router.post("/:courseId/modules", requireAuth, moduleController.createModule);
router.delete("/:courseId/modules/:moduleId", requireAuth, moduleController.deleteModule);

router.post("/:courseId/modules/:moduleId/content", requireAuth, moduleController.addContent);
router.delete("/:courseId/modules/:moduleId/content/:type/:refId", requireAuth, moduleController.deleteContent);

export default router;
