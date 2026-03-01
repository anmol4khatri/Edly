import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    aboutCourse: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length <= 6,
        message: 'You can only add upto 6 about course sections',
      },
    },
    highlights: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length <= 6,
        message: 'You can only add upto 6 highlights',
      },
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
