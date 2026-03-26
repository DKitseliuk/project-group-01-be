import multer from 'multer';
import { LOCATION_VALIDATION } from '../constants/validation.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (LOCATION_VALIDATION.imageFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg and png images are allowed'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: LOCATION_VALIDATION.imageMaxSize,
  },
  fileFilter,
});
