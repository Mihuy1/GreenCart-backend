import {
  listAllOrderItems,
  findOrderItemById,
  addOrderItem,
  modifyOrderItem,
  removeOrderItem,
} from '../models/orderItem-model.js';

export const getItem = async (req, res, next) => {
  try {
    const items = await listAllOrderItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

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
