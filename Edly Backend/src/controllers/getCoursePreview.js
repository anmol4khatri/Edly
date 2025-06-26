const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Pdf = require('../models/Pdf');
const Quiz = require('../models/Quiz');

const getCoursePreview = async (req, res) => {
  const { courseId } = req.params;
  const educatorId = req.educatorFromSubdomain._id;

  try {
    const course = await Course.findOne({ _id: courseId, educatorId }).lean();
    if (!course) return res.status(404).json({ error: "Course not found" });

    const modules = await Module.find({ courseId }).sort({ createdAt: 1 }).lean();

    const populatedModules = await Promise.all(
      modules.map(async (mod, index) => {
        let content = [];

        if (index < 2) {
          // Only populate content for the first two modules
          content = await Promise.all(
            mod.content.map(async (item) => {
              let actual = null;

              if (item.type === 'lesson') {
                actual = await Lesson.findById(item.refId).lean();
              } else if (item.type === 'pdf') {
                actual = await Pdf.findById(item.refId).lean();
              } else if (item.type === 'quiz') {
                const quiz = await Quiz.findById(item.refId).lean();
                if (quiz) {
                  actual = { _id: quiz._id, title: quiz.title }; // Only return basic info
                }
              }

              return {
                type: item.type,
                data: actual
              };
            })
          );
        }

        return {
          _id: mod._id,
          title: mod.title,
          courseId: mod.courseId,
          content, // will be empty for modules beyond index 1
          createdAt: mod.createdAt,
          updatedAt: mod.updatedAt
        };
      })
    );

    res.json({
      _id: course._id,
      title: course.title,
      price: course.price,
      aboutCourse: course.aboutCourse,
      highlights: course.highlights,
      modules: populatedModules
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getCoursePreview;
