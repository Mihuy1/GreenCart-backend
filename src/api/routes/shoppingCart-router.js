import express from 'express';
import {
  getShoppingCart,
  getShoppingCartById,
  getShoppingCartInfo,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
} from '../controllers/shoppingCart-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

const shoppingCartRouter = express.Router();

shoppingCartRouter.route('/').get(getShoppingCart).post(postShoppingCart);
shoppingCartRouter
  .route('/:id')
  .get(getShoppingCartInfo)
  .put(putShoppingCart)
  .delete(deleteShoppingCart);

export default shoppingCartRouter;
