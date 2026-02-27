import Course from "#models/Course.js";
import Enrollment from "#models/Enrollment.js";
import Module from "#models/Module.js";
import Lesson from "#models/Lesson.js";
import Pdf from "#models/Pdf.js";
import Quiz from "#models/Quiz.js";
import { NotFoundError, ForbiddenError } from "#utils/errors.js";

class CourseService {
    async createCourse(tenantId, userRole, data) {
        if (userRole !== 'educator' && userRole !== 'admin') {
            throw new ForbiddenError("Only educators can create courses");
        }

        const { title, description, thumbnail, price, aboutCourse, highlights } = data;

        const course = new Course({
            tenantId,
            title,
            description,
            thumbnail,
            price,
            aboutCourse,
            highlights,
        });

        await course.save();
        return course;
    }

    async updateCourse(tenantId, userRole, courseId, updates) {
        if (userRole !== 'educator' && userRole !== 'admin') {
            throw new ForbiddenError("Unauthorized to update course");
        }

        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        Object.keys(updates).forEach((update) => course[update] = updates[update]);
        await course.save();

        return course;
    }

    async getAllCourses(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const courses = await Course.find({ tenantId })
            .select('title description thumbnail price') // Lightweight for list
            .skip(skip)
            .limit(limit);

        const total = await Course.countDocuments({ tenantId });

        return { courses, total };
    }

    async getCourseById(tenantId, courseId, user = null) {
        const course = await Course.findOne({ _id: courseId, tenantId }).lean();

        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const modules = await Module.find({ courseId }).lean();
        const modulePreviews = await Promise.all(modules.map(async (mod) => {
            const previewContent = await Promise.all(mod.content.map(async (item) => {
                let title = "Content";
                if (item.type === 'lesson') {
                    const l = await Lesson.findById(item.refId).select('title').lean();
                    if (l) title = l.title;
                } else if (item.type === 'pdf') {
                    const p = await Pdf.findById(item.refId).select('title').lean();
                    if (p) title = p.title;
                } else if (item.type === 'quiz') {
                    const q = await Quiz.findById(item.refId).select('title').lean();
                    if (q) title = q.title;
                }
                return { type: item.type, title };
            }));
            return { _id: mod._id, title: mod.title, contentPreview: previewContent };
        }));

        course.modules = modulePreviews;

        let isEnrolled = false;
        if (user) {
            const enrollment = await Enrollment.findOne({
                courseId: courseId,
                studentId: user._id,
                tenantId
            });
            if (enrollment) isEnrolled = true;
        }

        return { course, isEnrolled };
    }

    async deleteCourse(tenantId, userRole, courseId) {
        if (userRole !== 'educator' && userRole !== 'admin') {
            throw new ForbiddenError("Unauthorized to delete course");
        }

        const course = await Course.findOneAndDelete({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        return true;
    }
}

export const courseService = new CourseService();
