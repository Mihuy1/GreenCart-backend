import express from 'express';
import {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product-controller.js';

import multer from 'multer';

const productRouter = express.Router();

productRouter.route('/').get(getProduct).post(postProduct);
productRouter
  .route('/:id')
  .get(getProductById)
  .put(putProduct)
  .delete(deleteProduct);

export default productRouter;
