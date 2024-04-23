import express from 'express';
import {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product-controller.js';
import {
  authenticationToken,
  isAdmin,
  createThumbnail,
} from '../../middlewares.js'; // Import the upload middleware

import multer from 'multer';

const productRouter = express.Router();

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

productRouter
  .route('/')
  .get(getProduct)
  .post(
    authenticationToken,
    isAdmin,
    upload.single('file'),
    createThumbnail,
    postProduct
  );
productRouter
  .route('/:id')
  .get(getProductById)
  .put(authenticationToken, isAdmin, putProduct)
  .delete(authenticationToken, isAdmin, deleteProduct);

export default productRouter;
