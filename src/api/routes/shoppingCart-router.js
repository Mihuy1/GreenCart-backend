import express from 'express';
import {
  getShoppingCart,
  getShoppingCartById,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
} from '../controllers/shoppingCart-controller.js';
import {isAdmin} from '../../middlewares.js';

const shoppingCartRouter = express.Router();

shoppingCartRouter.route('/').get(getShoppingCart).post(postShoppingCart);
shoppingCartRouter
  .route('/:id')
  .get(getShoppingCartById)
  .put(isAdmin, putShoppingCart)
  .delete(isAdmin, deleteShoppingCart);

export default shoppingCartRouter;
