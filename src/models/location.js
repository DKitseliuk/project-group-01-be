import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    locationType: {
      type: String,
      trim: true,
      required: true,
    },
    region: {
      type: String,
      trim: true,
      required: true,
    },
    rate: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    coordinates: {
      lat: { type: Number },
      lon: { type: Number },
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedbacksId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

locationSchema.index(
  { name: 'text', description: 'text' },
  {
    name: 'LocationTextIndex',
    weights: {
      name: 10,
      description: 1,
    },
    default_language: 'none',
  },
);

export const Location = model('Location', locationSchema, 'locations');
