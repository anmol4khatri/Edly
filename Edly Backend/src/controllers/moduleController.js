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
      content: processedContent,
      courseId,
    });

    await Courses.findByIdAndUpdate(
      courseId,
      { $addToSet: { modules: newModule._id } },
      { new: true }
    );

    // Manually populate full content
    const populatedContent = await Promise.all(
      newModule.content.map(async (item) => {
        let data = null;

        if (item.type === "lesson") {
          data = await Lesson.findById(item.refId);
        } else if (item.type === "quiz") {
          data = await Quiz.findById(item.refId);
        } else if (item.type === "pdf") {
          data = await Pdf.findById(item.refId);
        }

        return {
          type: item.type,
          refId: item.refId,
          data,
        };
      })
    );

    res.status(201).json({
      message: "Module created successfully",
      module: {
        ...newModule.toObject(),
        content: populatedContent,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message || "Module creation failed" });
  }
};

const getAllModulesByCourse = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const modules = await Module.find({ courseId });

    // Manually populate each content item based on its type
    const populatedModules = await Promise.all(modules.map(async (module) => {
      const populatedContent = await Promise.all(module.content.map(async (item) => {
        let fullData;

        if (item.type === "lesson") {
          fullData = await Lesson.findById(item.refId);
        } else if (item.type === "quiz") {
          fullData = await Quiz.findById(item.refId);
        } else if (item.type === "pdf") {
          fullData = await Pdf.findById(item.refId);
        }

        return {
          type: item.type,
          refId: item.refId,
          data: fullData || null
        };
      }));

      return {
        ...module.toObject(),
        content: populatedContent
      };
    }));

    res.status(200).json(populatedModules);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    createModule,
    getAllModulesByCourse
}
