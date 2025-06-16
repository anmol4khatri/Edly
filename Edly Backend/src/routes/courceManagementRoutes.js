const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const { createCourse, getAllCourses, deleteCourse, updateCourse } = require("../controllers/educatorCourseController");

router.post("/educator/create_course", requireEducatorAuth, createCourse);
router.get("/educator/get_all_courses", requireEducatorAuth, getAllCourses);
router.delete("/educator/delete_course", requireEducatorAuth, deleteCourse);
router.patch("/educator/update_course", requireEducatorAuth, updateCourse);

module.exports = router;