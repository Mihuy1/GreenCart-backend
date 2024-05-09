import {
  listAllOrderItems,
  findOrderItemById,
  addOrderItem,
  modifyOrderItem,
  removeOrderItem,
} from '../models/orderItem-model.js';

/**
 * @api {get} /orderItems Get all order items
 * @apiName GetItems
 * @apiGroup OrderItem
 * @apiSuccess {Object[]} items List of order items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order items not found.
 */
export const getItem = async (req, res, next) => {
  try {
    const items = await listAllOrderItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /orderItems/:id Get order item by ID
 * @apiName GetItemById
 * @apiGroup OrderItem
 * @apiParam {Number} id Order item's unique ID.
 * @apiSuccess {Object} item Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
export const getItemById = async (req, res, next) => {
  try {
    const item = await findOrderItemById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {post} /orderItems Add a new order item
 * @apiName PostItem
 * @apiGroup OrderItem
 * @apiParam {String} item Order item data.
 * @apiSuccess {Object} item Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
export const postItem = async (req, res, next) => {
  try {
    const result = await addOrderItem(req.body);

    if (result.orderItemId) {
      res.status(201).json({message: 'New item added.', result});
    } else {
      res.sendStatus(400);
      console.log('result', result);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /orderItems/:id Update an order item
 * @apiName PutItem
 * @apiGroup OrderItem
 * @apiParam {Number} id Order item's unique ID.
 * @apiParam {String} item Order item data.
 * @apiSuccess {Object} item Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
export const putItem = async (req, res, next) => {
  try {
    const item = await modifyOrderItem(req.params.id, req.body);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /orderItems/:id Delete an order item
 * @apiName DeleteItem
 * @apiGroup OrderItem
 * @apiParam {Number} id Order item's unique ID.
 * @apiSuccess {Object} item Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
export const deleteItem = async (req, res, next) => {
  try {
    const item = await removeOrderItem(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};
