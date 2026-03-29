import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    rate: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Feedback = model('Feedback', feedbackSchema);
