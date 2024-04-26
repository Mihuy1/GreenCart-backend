import {
  listAllOrders,
  findOrderById,
  addOrder,
  modifyOrder,
  removeOrder,
} from '../models/order-model.js';

const getOrders = async (req, res, next) => {
  try {
    res.json(await listAllOrders());
  } catch (error) {
    next(error);
  }
};

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

const postOrder = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body); // Log the received request body
    const result = await addOrder(req.body);
    if (result.orderId) {
      res.status(201);
      res.json({message: 'New order added', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const putOrder = async (req, res, next) => {
  try {
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

export {getOrders, getOrderById, postOrder, putOrder, deleteOrder};
