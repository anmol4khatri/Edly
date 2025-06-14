const mongoose = require("mongoose")

const educatorSchema = new mongoose.Schema({
  // Required at registration/account creation
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  // Optional initially, filled during onboarding
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  subdomain: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },

  bio: {
    type: String,
  },

  organization: {
    type: String,
  },

  organizationLogo: {
    type: String,
  },

  experienceYears: {
    type: Number,
  },

  qualifications: {
    type: [String],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isProfileComplete: {
    type: Boolean,
    default: false,
  },

  coursesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
}, {timestamps: true});

const Educator = mongoose.model('Educator', educatorSchema);
module.exports = Educator;
