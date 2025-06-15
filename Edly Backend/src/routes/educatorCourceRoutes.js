const express = require("express");
const router = express.Router();

const requireEducatorAuth = require("../middlewares/requireEducatorAuth");
const { createCourse, getAllCourses } = require("../controllers/courseController");

router.post("/educator/create_course", requireEducatorAuth, createCourse);
router.get("/educator/get_all_courses", requireEducatorAuth, getAllCourses);

module.exports = router;