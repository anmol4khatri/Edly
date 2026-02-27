import Enrollment from "#models/Enrollment.js";
import Course from "#models/Course.js";
import Module from '#models/Module.js';
import Lesson from '#models/Lesson.js';
import Pdf from '#models/Pdf.js';
import Quiz from '#models/Quiz.js';
import { NotFoundError, ConflictError, ForbiddenError } from "#utils/errors.js";

class EnrollmentService {
    async enroll(tenantId, studentId, courseId) {
        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const existingEnrollment = await Enrollment.findOne({ courseId, studentId, tenantId });
        if (existingEnrollment) {
            throw new ConflictError("Already enrolled in this course");
        }

        const enrollment = new Enrollment({
            studentId,
            tenantId,
            courseId,
            enrolledAt: new Date(),
        });
        await enrollment.save();

        return enrollment;
    }

    async getMyEnrollments(tenantId, studentId) {
        const enrollments = await Enrollment.find({
            studentId,
            tenantId
        }).populate({
            path: 'courseId',
            select: 'title thumbnail description price'
        });

        return enrollments;
    }

    async getEnrolledCourseContent(tenantId, studentId, courseId) {
        const enrolled = await Enrollment.findOne({ studentId, courseId, tenantId });
        if (!enrolled) {
            throw new ForbiddenError("Not enrolled in this course");
        }

        const course = await Course.findOne({ _id: courseId, tenantId }).lean();
        if (!course) {
            throw new NotFoundError("Course not found");
        }

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

        return {
            ...course,
            modules: populatedModules
        };
    }
}

export const enrollmentService = new EnrollmentService();
