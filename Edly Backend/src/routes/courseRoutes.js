const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const moduleController = require("../controllers/moduleController");
const requireAuth = require("../middlewares/requireAuth");

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

module.exports = router;
