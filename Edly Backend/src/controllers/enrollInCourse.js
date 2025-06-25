const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const educatorId = req.educatorFromSubdomain._id;
    const studentId = req.student._id;

    try {
        const course = await Course.findOne({ _id: courseId, educatorId });
        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        };

        const existingEnrollment = await Enrollment.findOne({ courseId, studentId, educatorId });
        if (existingEnrollment) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }

        const enrollment = new Enrollment({
            studentId,
            educatorId,
            courseId,
            enrolledAt: new Date(),
            // payment logic
            // paymentId: (TODO) 
        });
        await enrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (err) {
        res.status(500).json({ error: "Server error during enrollment" });
    }
};

module.exports = enrollInCourse;