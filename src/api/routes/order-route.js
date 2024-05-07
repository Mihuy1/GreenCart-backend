import express from 'express';
import {
  getOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
  updateOrderStatusController,
} from '../controllers/order-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getOrders).post(postOrder);
orderRouter
  .route('/:id')
  .get(getOrderById)
  .put(putOrder)
  .delete(authenticationToken, isAdmin, deleteOrder);

// Add route for updating order status
orderRouter
  .route('/:id/status')
  .put(authenticationToken, updateOrderStatusController);

export default orderRouter;
