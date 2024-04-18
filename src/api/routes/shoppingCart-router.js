import express from 'express';
import {
  getShoppingCart,
  getShoppingCartById,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
} from '../controllers/shoppingCart-controller.js';

const shoppingCartRouter = express.Router();

shoppingCartRouter.route('/').get(getShoppingCart).post(postShoppingCart);
shoppingCartRouter
  .route('/:id')
  .get(getShoppingCartById)
  .put(putShoppingCart)
  .delete(deleteShoppingCart);

export default shoppingCartRouter;
