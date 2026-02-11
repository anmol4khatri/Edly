import Course from "#models/Course.js";
import Enrollment from "#models/Enrollment.js";

// Create Course
export const createCourse = async (req, res) => {
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
            // Future compatibility: createdBy: req.user._id
        });

        await course.save();
        res.status(201).json({ message: "Course Created Successfully", course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Course
export const updateCourse = async (req, res) => {
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

// Get All Courses (Public, but scoped to Tenant) with Pagination
export const getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const courses = await Course.find({ tenantId: req.tenant._id })
            .select('title description thumbnail price') // Lightweight for list
            .skip(skip)
            .limit(limit);

        const total = await Course.countDocuments({ tenantId: req.tenant._id });

        res.status(200).json({
            courses,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Course (Public)
export const getCourseById = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id })
            .populate("modules");

        if (!course) return res.status(404).json({ error: "Course not found" });

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
export const deleteCourse = async (req, res) => {
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
