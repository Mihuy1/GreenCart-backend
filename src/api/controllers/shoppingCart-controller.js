import e from 'express';
import {
  listAllShoppingCart,
  findShoppingCartById,
  addShoppingCart,
  modifyShoppingCart,
  removeShoppingCart,
} from '../models/shoppingCart-model.js';

const getShoppingCart = async (req, res) => {
  res.json(await listAllShoppingCart());
};

const getShoppingCartById = async (req, res) => {
  const shoppingCart = await findShoppingCartById(req.params.id);
  if (shoppingCart) {
    res.json(shoppingCart);
  } else {
    res.sendStatus(404);
  }
};

const postShoppingCart = async (req, res) => {
  const result = await addShoppingCart(req.body);
  if (result.shoppingCart_id) {
    res.status(201);
    res.json({message: 'New shoppingCart added'});
  } else {
    res.sendStatus(400);
  }
};

const putShoppingCart = async (req, res) => {
  const result = await modifyShoppingCart(req.params.id, req.body);
  if (result) {
    res.status(200);
    res.json({message: 'shoppingCart updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteShoppingCart = async (req, res) => {
  const shoppingCartId = req.params.id;

  const result = await removeShoppingCart(shoppingCartId);

  if (result) {
    res.status(200);
    res.json({message: 'shoppingCart deleted successfully'});
  } else {
    res.status(404);
  }
};

export {
  getShoppingCart,
  getShoppingCartById,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
};
