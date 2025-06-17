const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const { createCourse, getAllCourses, deleteCourse, updateCourse } = require("../controllers/educatorCourseController");
const { createModule, getAllModulesByCourse, deleteModule } = require("../controllers/moduleController");

// Course
router.post("/educator/create_course", requireEducatorAuth, createCourse);
router.get("/educator/get_all_courses", requireEducatorAuth, getAllCourses);
router.delete("/educator/delete_course", requireEducatorAuth, deleteCourse);
router.patch("/educator/update_course", requireEducatorAuth, updateCourse);

// Module
router.post("/educator/create_module", requireEducatorAuth, createModule);
router.get("/educator/get_all_modules/:courseId", requireEducatorAuth, getAllModulesByCourse);
router.delete("/educator/delete_module/:courseId/:moduleId", requireEducatorAuth, deleteModule);

module.exports = router;