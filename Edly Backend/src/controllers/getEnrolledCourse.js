const Course = require('../models/Course');
const Module = require('../models/Module');
const Enrollment = require('../models/Enrollment');
const Lesson = require('../models/Lesson');
const Pdf = require('../models/Pdf');
const Quiz = require('../models/Quiz');

const getEnrolledCourse = async (req, res) => {
  const { courseId } = req.params;
  const educatorId = req.educatorFromSubdomain._id;
  const studentId = req.student._id;

  try {
    const enrolled = await Enrollment.findOne({ studentId, courseId, educatorId });
    if (!enrolled) return res.status(403).json({ error: "Not enrolled in this course" });

    const course = await Course.findOne({ _id: courseId, educatorId }).lean();
    if (!course) return res.status(404).json({ error: "Course not found" });

    const modules = await Module.find({ courseId }).lean();

    // For each module, manually populate content
    const populatedModules = await Promise.all(modules.map(async (mod) => {
      const content = await Promise.all(mod.content.map(async (item) => {
        let actual;

        if (item.type === 'lesson') {
          actual = await Lesson.findById(item.refId).lean();
        } else if (item.type === 'pdf') {
          actual = await Pdf.findById(item.refId).lean();
        } else if (item.type === 'quiz') {
          const quiz = await Quiz.findById(item.refId).lean();
          if (quiz) {
            actual = {
              _id: quiz._id,
              title: quiz.title
            }; // Only expose basic quiz info
          }
        }

        return {
          type: item.type,
          data: actual
        };
      }));

      return {
        _id: mod._id,
        title: mod.title,
        courseId: mod.courseId,
        content,
        createdAt: mod.createdAt,
        updatedAt: mod.updatedAt
      };
    }));

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

module.exports = getEnrolledCourse;
