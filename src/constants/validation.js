const ALLOWED_IMAGE_FILE_TYPES = ['image/png', 'image/jpeg'];
const REGION_LEVEL = ['регіональне', 'обласне', 'локальне'];

const USER_VALIDATION = {
  nameMinLength: 2,
  nameMaxLength: 32,
  emailMaxLength: 64,
  passwordMinLength: 8,
  passwordMaxLength: 128,
};

const LOCATION_VALIDATION = {
  nameMinLength: 3,
  nameMaxLength: 96,
  locationTypeMaxLength: 64,
  regionMaxLength: 64,
  descriptionMinLength: 20,
  descriptionMaxLength: 6000,
  imageMaxSize: 1024 * 1024 * 1,
  imageFileTypes: ALLOWED_IMAGE_FILE_TYPES,
};

const FEEDBACK_VALIDATION = {
  usernameMinLength: 2,
  usernameMaxLength: 32,
  rateMin: 1,
  rateMax: 5,
  descriptionMinLength: 1,
  descriptionMaxLength: 200,
};

export {
  USER_VALIDATION,
  LOCATION_VALIDATION,
  FEEDBACK_VALIDATION,
  REGION_LEVEL,
};
