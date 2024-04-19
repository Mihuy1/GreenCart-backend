import express from 'express';
import {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product-controller.js';

import {isAdmin, authenticationToken} from '../../middlewares.js';

import multer from 'multer';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(getProduct)
  .post(authenticationToken, isAdmin, postProduct);
productRouter
  .route('/:id')
  .get(getProductById)
  .put(authenticationToken, isAdmin, putProduct)
  .delete(authenticationToken, isAdmin, deleteProduct);

export default productRouter;
