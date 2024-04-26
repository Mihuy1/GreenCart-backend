import {
  listAllShoppingCart,
  findShoppingCartById,
  findShoppingCartInfo,
  addShoppingCart,
  modifyShoppingCart,
  removeShoppingCart,
} from '../models/shoppingCart-model.js';

const getShoppingCart = async (req, res, next) => {
  try {
    const shoppingCarts = await listAllShoppingCart();
    res.json(shoppingCarts);
  } catch (error) {
    next(error);
  }
};

const getShoppingCartById = async (req, res, next) => {
  try {
    const shoppingCart = await findShoppingCartById(req.params.id);
    if (shoppingCart) {
      res.json(shoppingCart);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getShoppingCartInfo = async (req, res, next) => {
  try {
    const shoppingCart = await findShoppingCartInfo(req.params.id);
    if (shoppingCart) {
      res.json(shoppingCart);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const postShoppingCart = async (req, res, next) => {
  try {
    const result = await addShoppingCart(req.body);
    if (result.shoppingCart_id) {
      res.status(201).json({message: 'New shoppingCart added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const putShoppingCart = async (req, res, next) => {
  try {
    const result = await modifyShoppingCart(req.params.id, req.body);
    if (result) {
      res.json({message: 'shoppingCart updated.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const deleteShoppingCart = async (req, res, next) => {
  try {
    const result = await removeShoppingCart(req.params.id);
    if (result) {
      res.json({message: 'shoppingCart deleted successfully', result});
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getShoppingCart,
  getShoppingCartById,
  getShoppingCartInfo,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
};
