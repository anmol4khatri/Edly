const Lesson = require("../models/Lesson");
const Pdf = require("../models/Pdf");
const Quiz = require("../models/Quiz");
const Module = require("../models/Module");
const Courses = require("../models/Course");

const createModule = async (req, res) => {
    const { title, content, courseId } = req.body;

    if (!title || title.length === 0) {
        return res.status(400).json({ error: "Title is required and must not be empty" });
    }
    if (!content || content.length === 0) {
        return res.status(400).json({ error: "Content is required and must not be empty" });
    }
    if (!courseId) {
        return res.status(400).json({ error: "courseId is required to associate module with a course" });
    }

    try {
        const processedContent = await Promise.all(
            content.map(async (item) => {
                const { type, data } = item;
                let createdItem;

                if (type === "lesson") {
                    createdItem = await Lesson.create(data);
                } else if (type === "quiz") {
                    createdItem = await Quiz.create(data);
                } else if (type === "pdf") {
                    createdItem = await Pdf.create(data);
                } else {
                    throw new Error(`Invalid content type: ${type}`);
                }

                return { type, refId: createdItem._id };
            })
        );

        const newModule = await Module.create({
            title,
            content: processedContent
        });

        await Courses.findByIdAndUpdate(
            courseId,
            { $addToSet: { modules: newModule._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Module created successfully",
            module: newModule
        });

    } catch (error) {
        res.status(500).json({ error: error.message || "Module creation failed" });
    }
};


module.exports = {
    createModule,
}
