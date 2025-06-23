import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    } 
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;