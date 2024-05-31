import mongoose, { Schema, Document } from 'mongoose';

interface IAlert extends Document {
  userId: string;
  crypto: string;
  targetPrice: number;
  direction: 'above' | 'below';
  notified: boolean;
}

const alertSchema: Schema = new Schema({
  userId: { type: String, required: true },
  crypto: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  direction: { type: String, required: true },
  notified: { type: Boolean, default: false },
});

const Alert = mongoose.model<IAlert>('Alert', alertSchema);
export default Alert;
