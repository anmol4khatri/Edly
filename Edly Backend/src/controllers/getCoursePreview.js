const Course = require("../models/Course");
const Module = require("../models/Module");

const getCoursePreview = async (req, res) => {
    const educatorId = req.educatorFromSubdomain._id;
    const { courseId } = req.params;

    try {
        const course = await Course.findOne({ _id: courseId, educatorId }).lean();
        if (!course) return res.status(404).json({ error: "Course not found" });

        // Get module titles only (without content)
        const modules = await Module.findOne({courseId}, "title").lean(); 
        
        res.status(200).json({
            _id: course._id,
            educatorId: course.educatorId,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            price: course.price,
            aboutCourse: course.aboutCourse,
            highlights: course.highlights,
            modules: modules
        });
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};

module.exports = getCoursePreview;