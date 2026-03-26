import Location from '../models/location.js';

export const getAllLocations = async () => {
  return await Location.find();
};
