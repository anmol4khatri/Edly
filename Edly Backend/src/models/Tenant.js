import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema(
  {
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    settings: {
      bio: String,
      logo: String,
      primaryColor: String,
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
