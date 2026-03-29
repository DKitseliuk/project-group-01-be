import { LocationType } from '../models/locationType.js';
import { Region } from '../models/region.js';

const getAllRegions = () => {
  return Region.find();
};

const getAllLocationTypes = () => {
  return LocationType.find();
};

export default { getAllLocationTypes, getAllRegions };
