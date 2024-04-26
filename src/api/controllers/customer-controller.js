import {
  listAllcustomers,
  findCustomerById,
  modifyCustomer,
  removeCustomer,
  addCustomer,
} from '../models/customer-model.js';

import bcrypt from 'bcrypt';

const getCustomers = async (req, res, next) => {
  try {
    res.json(await listAllcustomers());
  } catch (error) {
    next(error);
  }
};

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

const putCustomer = async (req, res) => {
  try {
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
