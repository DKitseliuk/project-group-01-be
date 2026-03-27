import { LocationType } from '../models/locationType.js';

const getAllLocationTypes = () => {
  return LocationType.find();
};

export default { getAllLocationTypes };



