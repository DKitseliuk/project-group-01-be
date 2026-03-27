import { Region } from '../models/region.js';

export const getAllRegions = async ({ level } = {}) => {
  const filter = {};
  if (level) filter.level = level;

  const regions = await Region.find(filter).sort({ createdAt: -1 });
  return regions;
};
