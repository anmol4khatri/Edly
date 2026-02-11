import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  enrolledAt: { type: Date, default: Date.now },
  paymentId: String,
});

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // prevent duplicate enrollment

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
