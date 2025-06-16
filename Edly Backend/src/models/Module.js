const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
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
module.exports = Module;