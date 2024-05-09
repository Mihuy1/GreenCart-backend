import {
  listAllcustomers,
  findCustomerById,
  modifyCustomer,
  removeCustomer,
  addCustomer,
} from '../models/customer-model.js';

import bcrypt from 'bcrypt';

/**
 * @api {get} /customers Get all customers
 * @apiName GetCustomers
 * @apiGroup Customer
 * @apiSuccess {Object[]} customers List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customers not found.
 */
const getCustomers = async (req, res, next) => {
  try {
    res.json(await listAllcustomers());
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /customers/:id Get customer by ID
 * @apiName GetCustomerById
 * @apiGroup Customer
 * @apiParam {Number} id Customer's unique ID.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
const getCustomerById = async (req, res, next) => {
  try {
    const user = await findCustomerById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {post} /customers Add a new customer
 * @apiName PostCustomer
 * @apiGroup Customer
 * @apiParam {String} name Customer's name.
 * @apiParam {String} password Customer's password.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
const postCustomer = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log('postCustomer', req.body);
    const result = await addCustomer(req.body);
    if (result.customer_id) {
      res.status(201);
      res.json({message: 'New customer added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /customers/:id Update a customer
 * @apiName PutCustomer
 * @apiGroup Customer
 * @apiParam {Number} id Customer's unique ID.
 * @apiParam {String} name Customer's name.
 * @apiParam {String} password Customer's password.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
const putCustomer = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log('putCustomer', req.body);
    const result = await modifyCustomer(req.params.id, req.body);
    if (result) {
      res.status(200);
      res.json({message: 'Customer updated.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /customers/:id Delete a customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiParam {Number} id Customer's unique ID.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
const deleteCustomer = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await removeCustomer(userId);

    if (result) {
      res.status(200);
      res.json({message: 'Customer deleted succesfully'});
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
  deleteCustomer,
};
