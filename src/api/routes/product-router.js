import express from 'express';
import {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product-controller.js';

import {isAdmin} from '../../middlewares.js';

import multer from 'multer';

const productRouter = express.Router();

productRouter.route('/').get(getProduct).post(isAdmin, postProduct);
productRouter
  .route('/:id')
  .get(getProductById)
  .put(isAdmin, putProduct)
  .delete(isAdmin, deleteProduct);

export default productRouter;
