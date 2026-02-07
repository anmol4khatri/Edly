const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// Create Course
const createCourse = async (req, res) => {
    if (req.user.role !== 'educator' && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Only educators can create courses" });
    }

    const { title, description, thumbnail, price, aboutCourse, highlights } = req.body;

    try {
        const course = new Course({
            tenantId: req.tenant._id,
            title,
            description,
            thumbnail,
            price,
            aboutCourse,
            highlights,
        });

        await course.save();
        res.status(201).json({ message: "Course Created Successfully", course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    if (req.user.role !== 'educator' && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
    }
    const { courseId } = req.params;
    const updates = req.body;

    try {
        const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id });
        if (!course) return res.status(404).json({ error: "Course not found" });

        Object.keys(updates).forEach((update) => course[update] = updates[update]);
        await course.save();

        res.status(200).json({ message: "Course Updated", course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Courses (Public, but scoped to Tenant)
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ tenantId: req.tenant._id })
            .select('title description thumbnail price'); // Lightweight for list

        // If user is logged in, we COULD check enrollment status here, but better separate.
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Course (Public)
const getCourseById = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id })
            .populate("modules");

        if (!course) return res.status(404).json({ error: "Course not found" });

        // If user is student, we might want to mask content if not enrolled?
        // For now returning full course info (excluding video links if needed)

        let isEnrolled = false;
        if (req.user) {
            const enrollment = await Enrollment.findOne({
                courseId: courseId,
                studentId: req.user._id,
                tenantId: req.tenant._id
            });
            if (enrollment) isEnrolled = true;
        }

        res.status(200).json({ course, isEnrolled });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Course
const deleteCourse = async (req, res) => {
    if (req.user.role !== 'educator' && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
    }
    const { courseId } = req.params;
    try {
        const course = await Course.findOneAndDelete({ _id: courseId, tenantId: req.tenant._id });
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.status(200).json({ message: "Course Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    deleteCourse
}
