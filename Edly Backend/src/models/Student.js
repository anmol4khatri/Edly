const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    educatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Educator",
        required: true
    },
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
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
});

// 👇 Ensure unique email per educator
studentSchema.index({ emailId: 1, educatorId: 1 }, { unique: true });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
