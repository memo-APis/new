import mongoose from 'mongoose';

const SubUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailableSite', required: true },
  role: { type: String, enum: ['supUser ', 'supAdmin'], required: true },
});

export default mongoose.models.SubUser  || mongoose.model('SubUser ', SubUserSchema);