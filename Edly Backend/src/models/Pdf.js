import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema(
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
    },
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pdf = mongoose.model('Pdf', pdfSchema);
export default Pdf;
