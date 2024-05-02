import express from 'express';
import {
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
} from '../controllers/category-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

import multer from 'multer';

const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    // TODO fix spaces in filenames, we do not want to save files with spaces
    const originalFilename = file.originalname.split('.')[0].toLowerCase();
    const prefix = `${originalFilename}-${file.fieldname}`;

    let extension = 'jpg';

    if (file.mimetype === 'image/png') {
      extension = 'png';
    }

    // console.log("file in storage", file)

    const filename = `${prefix}-${suffix}.${extension}`;

    cb(null, filename);
  },
});

const upload = multer({
  // diskStorage destination property overwrites dest prop
  dest: 'uploads/',
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are supported.');
      error.status = 400;
      cb(error);
    }
  },
});

categoryRouter
  .route('/')
  .get(getCategory)
  .post(/*authenticationToken, isAdmin,*/ upload.single('file'), postCategory);
categoryRouter
  .route('/:id')
  .get(getCategoryById)
  .put(authenticationToken, isAdmin, upload.single('file'), putCategory)
  .delete(authenticationToken, isAdmin, deleteCategory);

export default categoryRouter;
