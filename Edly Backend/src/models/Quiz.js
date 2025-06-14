const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            options: {
                type: [String],
                required: true,
                validate: {
                    validator: (v) => v.length === 4,
                    message: "Exactly 4 options are required",
                }

            },
            correctAnswer: {
                type: Number,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
