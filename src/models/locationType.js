import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const LocationType = model('LocationType', locationTypeSchema, 'location_types');
