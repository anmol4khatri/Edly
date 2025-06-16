const validator = require("validator");

const validateCourseData = (data) => {
    const { title, description, thumbnail, price, aboutCourse, highlights } = data;

    if (!title || typeof title !== "string" || title.trim().length === 0 || title.length > 100) {
        throw new Error("Title is required and must be less than 100 characters.");
    }

    if (!description || typeof description !== "string" || description.trim().length === 0 || description.length > 300) {
        throw new Error("Description is required and must be less than 300 characters.");
    }

    if (!thumbnail || typeof thumbnail !== "string" || !validator.isURL(thumbnail)) {
        throw new Error("Thumbnail must be a valid URL.");
    }

    if (typeof price !== "number" || price < 0) {
        throw new Error("Price must be a non-negative number.");
    }

    if (!Array.isArray(aboutCourse) || aboutCourse.length === 0 || aboutCourse.length > 6) {
        throw new Error("aboutCourse must be an array with up to 6 items.");
    }

    if (!Array.isArray(highlights) || highlights.length === 0 || highlights.length > 6) {
        throw new Error("highlights must be an array with up to 6 items.");
    }

};

module.exports = validateCourseData;