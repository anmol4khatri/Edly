const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  educatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Educator', required: true },
  enrolledAt: { type: Date, default: Date.now },
  paymentId: String,
});

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // prevent duplicate enrollment

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
