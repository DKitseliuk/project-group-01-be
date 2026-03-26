import { Schema, model } from 'mongoose';
import { REGION_LEVEL } from '../constants/validation.js';

const regionSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: REGION_LEVEL,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Region = model('Region', regionSchema);
