import { Schema, model } from 'mongoose';
import { REGION_LEVEL } from '../constants/regionLevel.js';

const regionSchema = new Schema({
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
{timestamps: true});

export const Region = model('Region', regionSchema);
