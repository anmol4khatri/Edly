import Course from "#models/Course.js";
import Enrollment from "#models/Enrollment.js";
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
        const course = await Course.findOne({ _id: courseId, tenantId })
            .populate("modules");

        if (!course) {
            throw new NotFoundError("Course not found");
        }

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
