import {
  addProduct,
  findProductById,
  removeProduct,
  modifyProduct,
  listAllProducts,
} from '../models/product-model.js';

const getProduct = async (req, res, next) => {
  try {
    res.json(await listAllProducts());
  } catch (error) {
    next(error);
  }
};

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

const postProduct = async (req, res, next) => {
  try {
    console.log('postCat', req.body);
    console.log('req', req);
    console.log('file', req.file);
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

const putProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updatedFood = req.body;

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
