const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const { createCourse, getAllCourses, getCourseById, deleteCourse, updateCourse } = require("../controllers/educatorCourseController");
const { createModule, getAllModulesByCourse, deleteModule } = require("../controllers/moduleController");
const { addContentToModule, deleteContentById } = require("../controllers/educatorContentController");

// Course
router.post("/educator/create_course", requireEducatorAuth, createCourse);
router.get("/educator/get_all_courses", requireEducatorAuth, getAllCourses);
router.get("/educator/get_course/:courseId", requireEducatorAuth, getCourseById);
router.delete("/educator/delete_course/:courseId", requireEducatorAuth, deleteCourse);
router.patch("/educator/update_course", requireEducatorAuth, updateCourse);

// Module
router.post("/educator/create_module/:courseId", requireEducatorAuth, createModule);
router.get("/educator/get_all_modules/:courseId", requireEducatorAuth, getAllModulesByCourse);
router.delete("/educator/delete_module/:courseId/:moduleId", requireEducatorAuth, deleteModule);

// Content
router.post("/educator/add_content/:moduleId", requireEducatorAuth, addContentToModule);
router.delete("/educator/remove_content/:type/:refId", requireEducatorAuth, deleteContentById);

module.exports = router;