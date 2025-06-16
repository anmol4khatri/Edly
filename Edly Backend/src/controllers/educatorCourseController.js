const Course = require("../models/Course");
const Educator = require("../models/Educator");
const validateCourseData = require("../utils/validateCourseData");

const createCourse = async (req, res) => {
    const { _id, isProfileComplete } = req.educator;
    const { title, description, thumbnail, price, aboutCourse, highlights } = req.body;

    if(!isProfileComplete){
        return res.status(400).josn({error: "Incomplete registration / Not onboarded yet"});
    }

    try {

        validateCourseData(req.body); // Manual Validation (utility function)

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

const updateCourse = async (req, res) => {
    const { _id: educatorId } = req.educator;
    const { _id, title, description, thumbnail, price, aboutCourse, highlights } = req.body;

    if (!_id) {
        return res.status(400).json({ error: "Course ID is required." });
    }

    try {
        validateCourseData(req.body); // Manual Validation (utility function)

        const course = await Course.findOne({ _id, educatorId });
        if (!course) {
            return res.status(404).json({ error: "Course not found or unauthorized." });
        }

        course.title = title;
        course.description = description;
        course.thumbnail = thumbnail;
        course.price = price;
        course.aboutCourse = aboutCourse;
        course.highlights = highlights;

        const updatedCourse = await course.save();

        await Educator.findByIdAndUpdate(educatorId, {
            $addToSet: { coursesCreated: updatedCourse._id } // avoids duplicates
        });

        return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });

    } catch (err) {
        return res.status(500).json({ error: err.message });
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
    deleteCourse,
    updateCourse
}