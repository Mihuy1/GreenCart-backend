import {
  listAllOrders,
  findOrderById,
  addOrder,
  modifyOrder,
  removeOrder,
} from '../models/order-model.js';

const getOrders = async (req, res) => {
  res.json(await listAllOrders());
};

const getOrderById = async (req, res) => {
  const order = await findOrderById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.sendStatus(404);
  }
};

const postOrder = async (req, res) => {
  const result = await addOrder(req.body);
  if (result.order_id) {
    res.status(201);
    res.json({message: 'New order added'});
  } else {
    res.sendStatus(400);
  }
};

const putOrder = async (req, res) => {
  const result = await modifyOrder(req.params.id, req.body);
  if (result) {
    res.status(200);
    res.json({message: 'Order updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  const result = await removeOrder(orderId);

  if (result) {
    res.status(200);
    res.json({message: 'order deleted successfully'});
  } else {
    res.status(404);
  }
};

export {getOrders, getOrderById, postOrder, putOrder, deleteOrder};
