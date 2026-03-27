import { Region } from '../models/region.js';

const getAllRegions = () => {
  return Region.find();
};

export default { getAllRegions };
