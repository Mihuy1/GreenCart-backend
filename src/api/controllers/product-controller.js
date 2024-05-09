import {
  addProduct,
  findProductById,
  removeProduct,
  modifyProduct,
  listAllProducts,
} from '../models/product-model.js';

/**
 * @api {get} /products Get all products
 * @apiName GetProducts
 * @apiGroup Product
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
const getProduct = async (req, res, next) => {
  try {
    res.json(await listAllProducts());
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /products/:id Get product by ID
 * @apiName GetProductById
 * @apiGroup Product
 * @apiParam {Number} id Product's unique ID.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
const getProductById = async (req, res, error) => {
  try {
    const product = await findProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {post} /products Add a new product
 * @apiName PostProduct
 * @apiGroup Product
 * @apiParam {String} product Product data.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
const postProduct = async (req, res, next) => {
  try {
    console.log('postProduct', req.body);
    console.log('postProduct req', req);
    console.log('postProduct file', req.file);
    const result = await addProduct(req.body, req.file);
    if (result.product_id) {
      res.status(201);
      res.json({message: 'New product added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /products/:id Update a product
 * @apiName PutProduct
 * @apiGroup Product
 * @apiParam {Number} id Product's unique ID.
 * @apiParam {String} product Product data.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
const putProduct = async (req, res, next) => {
  try {
    console.log('putProduct', req.body);
    console.log('putProduct req', req);
    console.log('putProduct-controller file', req.file);
    const productId = req.params.id;
    const updatedFood = req.body;

    // If a file was uploaded, add its path to the updatedFood object
    if (req.file) {
      updatedFood.file = req.file.filename;
    }

    console.log('Put Food updatedFood', updatedFood);

    const result = await modifyProduct(updatedFood, productId);

    if (result) {
      res.status(201).json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /products/:id Delete a product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiParam {Number} id Product's unique ID.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const result = await removeProduct(productId);

    if (result) {
      res.status(200);
      res.json({message: 'Product deleted succesfully'});
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};

export {getProduct, getProductById, postProduct, putProduct, deleteProduct};
