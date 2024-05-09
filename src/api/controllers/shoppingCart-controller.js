import {
  listAllShoppingCart,
  findShoppingCartById,
  findShoppingCartInfo,
  addShoppingCart,
  modifyShoppingCart,
  removeShoppingCart,
} from '../models/shoppingCart-model.js';

/**
 * @api {get} /shoppingCarts Get all shopping carts
 * @apiName GetShoppingCarts
 * @apiGroup ShoppingCart
 * @apiSuccess {Object[]} shoppingCarts List of shopping carts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping carts not found.
 */
const getShoppingCart = async (req, res, next) => {
  try {
    const shoppingCarts = await listAllShoppingCart();
    res.json(shoppingCarts);
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /shoppingCarts/:id Get shopping cart by ID
 * @apiName GetShoppingCartById
 * @apiGroup ShoppingCart
 * @apiParam {Number} id ShoppingCart's unique ID.
 * @apiSuccess {Object} shoppingCart ShoppingCart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ShoppingCart not found.
 */
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

/**
 * @api {get} /shoppingCarts/:id/info Get shopping cart info by ID
 * @apiName GetShoppingCartInfo
 * @apiGroup ShoppingCart
 * @apiParam {Number} id ShoppingCart's unique ID.
 * @apiSuccess {Object} shoppingCart ShoppingCart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ShoppingCart not found.
 */
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

/**
 * @api {post} /shoppingCarts Add a new shopping cart
 * @apiName PostShoppingCart
 * @apiGroup ShoppingCart
 * @apiParam {String} shoppingCart ShoppingCart data.
 * @apiSuccess {Object} shoppingCart ShoppingCart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ShoppingCart not found.
 */
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

/**
 * @api {put} /shoppingCarts/:id Update a shopping cart
 * @apiName PutShoppingCart
 * @apiGroup ShoppingCart
 * @apiParam {Number} id ShoppingCart's unique ID.
 * @apiParam {String} shoppingCart ShoppingCart data.
 * @apiSuccess {Object} shoppingCart ShoppingCart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ShoppingCart not found.
 */
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

/**
 * @api {delete} /shoppingCarts/:id Delete a shopping cart
 * @apiName DeleteShoppingCart
 * @apiGroup ShoppingCart
 * @apiParam {Number} id ShoppingCart's unique ID.
 * @apiSuccess {Object} shoppingCart ShoppingCart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ShoppingCart not found.
 */
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
