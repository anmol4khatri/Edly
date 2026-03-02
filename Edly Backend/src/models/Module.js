import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    content: [
      {
        type: {
          type: String,
          enum: ['Lesson', 'Pdf', 'Quiz'],
          required: true,
        },
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'content.type',
        },
      },
    ],
  },
  { timestamps: true }
);

moduleSchema.index({ courseId: 1 });

const Module = mongoose.model('Module', moduleSchema);
export default Module;
