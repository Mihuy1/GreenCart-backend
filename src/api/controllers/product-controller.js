import {
  addProduct,
  findProductById,
  removeProduct,
  modifyProduct,
  listAllProducts,
} from '../models/product-model.js';

const getProduct = async (req, res) => {
  res.json(await listAllProducts());
};

const getProductById = async (req, res) => {
  const product = await findProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
};

const postProduct = async (req, res) => {
  console.log('postProduct', req.body);
  const result = await addProduct(req.body);
  if (result.product_id) {
    res.status(201);
    res.json({message: 'New product added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedFood = req.body;

  const result = await modifyProduct(updatedFood, productId);

  if (result) {
    res.status(201).json(result);
  } else {
    res.sendStatus(404);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const result = await removeProduct(productId);

  if (result) {
    res.status(200);
    res.json({message: 'Product deleted succesfully'});
  } else {
    res.status(404);
  }
};

export {getProduct, getProductById, postProduct, putProduct, deleteProduct};
