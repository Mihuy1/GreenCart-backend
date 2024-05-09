import {
  listAllOrders,
  findOrderById,
  addOrder,
  modifyOrder,
  removeOrder,
  updateOrderStatus,
} from '../models/order-model.js';

import {startOrderTimer} from '../services/order-logic.js';

/**
 * @api {get} /orders Get all orders
 * @apiName GetOrders
 * @apiGroup Order
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
const getOrders = async (req, res, next) => {
  try {
    res.json(await listAllOrders());
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /orders/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await findOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {post} /orders Add a new order
 * @apiName PostOrder
 * @apiGroup Order
 * @apiParam {String} order Order data.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
const postOrder = async (req, res, next) => {
  try {
    console.log('Received request body postOrder:', req.body); // Log the received request body
    const result = await addOrder(req.body);
    if (result.orderId) {
      res.status(201);
      res.json({message: 'New order added', result});
      //startOrderTimer(result.orderId);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /orders/:id Update an order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiParam {String} order Order data.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
const putOrder = async (req, res, next) => {
  try {
    console.log('Received request body putOrder:', req.body); // Log the received request body
    const result = await modifyOrder(req.params.id, req.body);
    if (result) {
      res.status(200);
      res.json({message: 'Order updated.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /orders/:id/status Update order status
 * @apiName UpdateOrderStatus
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiParam {String} status_code New status code.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
const updateOrderStatusController = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status_code;

    const result = await updateOrderStatus(orderId, newStatus);

    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /orders/:id Delete an order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const result = await removeOrder(orderId);

    if (result) {
      res.status(200);
      res.json({message: 'order deleted successfully'});
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
  updateOrderStatusController,
};
