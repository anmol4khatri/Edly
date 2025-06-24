const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getCoursesWithEnrollmentStatus = async (req, res) => {
    const educatorId = req.educatorFromSubdomain._id; // from "resolveEducatorFromSubdomain" middleware
    const studentId = req.student._id; // from "authStudentController" middleware

    try {
        // all courses
        const courses = await Course.find({ educatorId }, "_id title price thumbnail");

        // get courseIds of enrolled courses
        const enrollments = await Enrollment.find({ studentId, educatorId }).select("courseId");
        const enrolledCoursesId = enrollments.map(e => e.courseId.toString());

        // add "isEnrolled" flag to all the courses
        const result = courses.map(course => ({
            ...course.toObject(),
            isEnrolled: enrolledCoursesId.includes(course._id.toString()) // returns boolean
        }));

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

module.exports = getCoursesWithEnrollmentStatus;