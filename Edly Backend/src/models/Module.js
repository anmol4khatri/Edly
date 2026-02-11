import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    content: [
        {
            type: {
                type: String,
                enum: ['lesson', 'pdf', 'quiz'],
                required: true,
            },
            refId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);
export default Module;