import express from 'express';
import {
  getOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
} from '../controllers/order-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getOrders).post(postOrder);
orderRouter
  .route('/:id')
  .get(getOrderById)
  .put(putOrder)
  .delete(authenticationToken, isAdmin, deleteOrder);

export default orderRouter;
