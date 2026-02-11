import Enrollment from "#models/Enrollment.js";
import Course from "#models/Course.js";
import Module from '#models/Module.js';
import Lesson from '#models/Lesson.js';
import Pdf from '#models/Pdf.js';
import Quiz from '#models/Quiz.js';

// Enroll in a course
export const enroll = async (req, res) => {
    const { courseId } = req.body;
    const studentId = req.user._id;
    const tenantId = req.tenant._id;

    try {
        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) return res.status(404).json({ error: "Course not found" });

        const existingEnrollment = await Enrollment.findOne({ courseId, studentId, tenantId });
        if (existingEnrollment) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }

        const enrollment = new Enrollment({
            studentId,
            tenantId, // Changed from educatorId
            courseId,
            enrolledAt: new Date(),
        });
        await enrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get My Enrollments
export const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            studentId: req.user._id,
            tenantId: req.tenant._id
        }).populate({
            path: 'courseId',
            select: 'title thumbnail description price'
        });

        res.status(200).json({ enrollments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Enrolled Course Content (Full Access)
export const getEnrolledCourseContent = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user._id;
    const tenantId = req.tenant._id;

    try {
        // Verify enrollment
        const enrolled = await Enrollment.findOne({ studentId, courseId, tenantId });
        if (!enrolled) return res.status(403).json({ error: "Not enrolled in this course" });

        const course = await Course.findOne({ _id: courseId, tenantId }).lean();
        if (!course) return res.status(404).json({ error: "Course not found" });

        const modules = await Module.find({ courseId }).lean();

        // Populate content manually
        const populatedModules = await Promise.all(modules.map(async (mod) => {
            const content = await Promise.all(mod.content.map(async (item) => {
                let actual;
                if (item.type === 'lesson') {
                    actual = await Lesson.findById(item.refId).lean();
                } else if (item.type === 'pdf') {
                    actual = await Pdf.findById(item.refId).lean();
                } else if (item.type === 'quiz') {
                    actual = await Quiz.findById(item.refId).lean();
                }
                return { type: item.type, data: actual };
            }));

            return { ...mod, content };
        }));

        res.json({
            ...course,
            modules: populatedModules
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
