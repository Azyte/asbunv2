import mongoose from 'mongoose';

const nebengSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  datetime: { type: Date, required: true },
  seats: { type: Number, required: true },
  status: { type: String, enum: ['open', 'full', 'done'], default: 'open' },
}, { timestamps: true });

export const Nebeng = mongoose.models.Nebeng || mongoose.model('Nebeng', nebengSchema);

const partnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  description: { type: String },
  datetime: { type: Date, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

export const CariPartner = mongoose.models.CariPartner || mongoose.model('CariPartner', partnerSchema);
