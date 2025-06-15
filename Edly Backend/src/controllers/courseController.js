const Course = require("../models/Course");
const validator = require("validator");
const Educator = require("../models/Educator");

const createCourse = async (req, res) => {
    const { _id, isProfileComplete } = req.educator;
    const { title, description, thumbnail, price, aboutCourse, highlights } = req.body;

    // Manual Validations
    if(!isProfileComplete){
        return res.status(400).josn({error: "Incomplete registration / Not onboarded yet"});
    }

    if (!title || typeof title !== "string" || title.trim().length === 0 || title.length > 100) {
        return res.status(400).json({ error: "Title is required and must be less than 100 characters" });
    }

    if (!description || typeof description !== "string" || description.trim().length === 0 || description.length > 300) {
        return res.status(400).json({ error: "Description is required and must be less than 300 characters" });
    }

    if (!thumbnail || typeof thumbnail !== "string" || !validator.isURL(thumbnail)) {
        return res.status(400).json({ error: "Thumbnail must be a valid URL" });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({ error: "Price must be a non-negative number" });
    }

    if (!Array.isArray(aboutCourse) || aboutCourse.length === 0 || aboutCourse.length > 6) {
        return res.status(400).json({ error: "aboutCourse must be an array with up to 6 items" });
    }

    if (!Array.isArray(highlights) || highlights.length === 0 || highlights.length > 6) {
        return res.status(400).json({ error: "highlights must be an array with up to 6 items" });
    }

    // Main Logic
    try {
        const course = new Course({
            educatorId: _id, title, description, thumbnail, price, aboutCourse, highlights
        });

        const savedCourse = await course.save(); 

        await Educator.findByIdAndUpdate(
            _id,
            { $push: { coursesCreated: savedCourse._id } },
            { new: true }
        );

        res.status(201).json({ message: "Course created", course: savedCourse });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllCourses = async (req, res) => {
    const { _id } = req.educator;
    
    try {
        const courses = await Course.find({ educatorId: _id });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    const { _id } = req.educator;
    const { courseId } = req.body;

    try {
        const deleted = await Course.findOneAndDelete({
            _id: courseId,
            educatorId: _id
        });

        if (!deleted) {
            return res.status(404).json({ error: "Course not found or unauthorized" });
        }

         await Educator.findByIdAndUpdate(
            _id,
            { $pull: { coursesCreated: courseId } }
        );

        res.status(200).json({ message: "Course deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createCourse,
    getAllCourses,
    deleteCourse
}