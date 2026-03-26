import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    rate: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    // Backward compatibility: older feedback documents in DB omit locationId (only location.feedbacksId linked them).
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Feedback = model('Feedback', feedbackSchema);
