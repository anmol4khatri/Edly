import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true,
        index: true // Efficient tenant filtering
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['student', 'educator', 'admin'],
        required: true,
        default: 'student'
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    // Educator specific fields (can be moved to profile subdoc if grows)
    experience: Number,
    qualifications: [String],

    // Student specific fields
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true });

// Ensure email is unique PER TENANT
userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;
