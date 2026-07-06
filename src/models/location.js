import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    image: { type: String, trim: true },
    name: { type: String, trim: true },
    // Slug string (e.g. matches location_types.slug), not ObjectId — DB seed uses strings; ref would need a data migration.
    locationType: { type: String, trim: true },
    region: { type: String, trim: true },
    rate: { type: Number },
    description: { type: String, trim: true },
    coordinates: {
      lat: { type: Number },
      lon: { type: Number },
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    feedbacksId: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Location = model('Location', locationSchema);
