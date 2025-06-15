const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const { createCourse, getAllCourses, deleteCourse } = require("../controllers/courseController");

router.post("/educator/create_course", requireEducatorAuth, createCourse);
router.get("/educator/get_all_courses", requireEducatorAuth, getAllCourses);
router.put("/educator/delete_course", requireEducatorAuth, deleteCourse);

module.exports = router;