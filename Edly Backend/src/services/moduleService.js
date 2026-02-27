import Module from "#models/Module.js";
import Course from "#models/Course.js";
import Lesson from "#models/Lesson.js";
import Pdf from "#models/Pdf.js";
import Quiz from "#models/Quiz.js";
import { NotFoundError, ValidationError, ForbiddenError } from "#utils/errors.js";

class ModuleService {
    async verifyModuleOwnership(moduleId, tenantId) {
        const module = await Module.findById(moduleId);
        if (!module) return null;

        const course = await Course.findOne({ _id: module.courseId, tenantId });
        if (!course) return null;

        return module;
    }

    async createModule(tenantId, courseId, data) {
        const { title, content } = data;

        if (!title) {
            throw new ValidationError("Title is required");
        }

        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        let processedContent = [];
        if (content && content.length > 0) {
            processedContent = await Promise.all(content.map(async (item) => {
                const { type, data } = item;
                let createdItem;
                if (type === "lesson") createdItem = await Lesson.create(data);
                else if (type === "quiz") createdItem = await Quiz.create(data);
                else if (type === "pdf") createdItem = await Pdf.create(data);
                else throw new ValidationError(`Invalid content type: ${type}`);

                return { type, refId: createdItem._id };
            }));
        }

        const newModule = await Module.create({
            title,
            content: processedContent,
            courseId,
        });

        await Course.findByIdAndUpdate(courseId, { $addToSet: { modules: newModule._id } });

        return newModule;
    }

    async getAllModulesByCourse(tenantId, courseId) {
        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const modules = await Module.find({ courseId });

        const populatedModules = await Promise.all(modules.map(async (module) => {
            const populatedContent = await Promise.all(module.content.map(async (item) => {
                let fullData;
                if (item.type === "lesson") fullData = await Lesson.findById(item.refId);
                else if (item.type === "quiz") fullData = await Quiz.findById(item.refId);
                else if (item.type === "pdf") fullData = await Pdf.findById(item.refId);
                return { type: item.type, refId: item.refId, data: fullData };
            }));
            return { ...module.toObject(), content: populatedContent };
        }));

        return populatedModules;
    }

    async deleteModule(tenantId, courseId, moduleId) {
        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found or access denied");
        }

        const module = await Module.findOne({ _id: moduleId, courseId });
        if (!module) {
            throw new NotFoundError("Module not found");
        }

        await Promise.all(module.content.map(async (item) => {
            if (item.type === "lesson") await Lesson.findByIdAndDelete(item.refId);
            else if (item.type === "quiz") await Quiz.findByIdAndDelete(item.refId);
            else if (item.type === "pdf") await Pdf.findByIdAndDelete(item.refId);
        }));

        await Module.deleteOne({ _id: moduleId });
        await Course.findByIdAndUpdate(courseId, { $pull: { modules: moduleId } });

        return true;
    }

    async addContent(tenantId, courseId, moduleId, content) {
        if (!content || !Array.isArray(content)) {
            throw new ValidationError("Content array required");
        }

        const course = await Course.findOne({ _id: courseId, tenantId });
        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const module = await Module.findOne({ _id: moduleId, courseId });
        if (!module) {
            throw new NotFoundError("Module not found");
        }

        const newItems = await Promise.all(content.map(async (item) => {
            const { type, data } = item;
            let createdItem;
            if (type === "lesson") createdItem = await Lesson.create(data);
            else if (type === "quiz") createdItem = await Quiz.create(data);
            else if (type === "pdf") createdItem = await Pdf.create(data);
            else throw new ValidationError(`Invalid type: ${type}`);
            return { type, refId: createdItem._id };
        }));

        const updatedModule = await Module.findByIdAndUpdate(
            moduleId,
            { $push: { content: { $each: newItems } } },
            { new: true }
        );

        return updatedModule;
    }

    async deleteContent(tenantId, moduleId, type, refId) {
        const module = await this.verifyModuleOwnership(moduleId, tenantId);
        if (!module) {
            throw new NotFoundError("Module not found or access denied");
        }

        const contentItem = module.content.find(item => item.refId.toString() === refId && item.type === type);
        if (!contentItem) {
            throw new NotFoundError("Content item not found in this module");
        }

        if (type === "lesson") await Lesson.findByIdAndDelete(refId);
        else if (type === "quiz") await Quiz.findByIdAndDelete(refId);
        else if (type === "pdf") await Pdf.findByIdAndDelete(refId);

        const updatedModule = await Module.findByIdAndUpdate(
            moduleId,
            { $pull: { content: { type, refId } } },
            { new: true }
        );

        return updatedModule;
    }
}

export const moduleService = new ModuleService();
