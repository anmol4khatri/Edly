import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Pdf = mongoose.model('Pdf', pdfSchema);
export default Pdf;
