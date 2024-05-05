import bcrypt from 'bcrypt';
import {
  addCustomer,
  getCustomerByName,
  getCustomerByEmail,
} from '../models/customer-model.js';
import jwt from 'jsonwebtoken';

const postLogin = async (req, res, next) => {
  try {
    console.log('postLogin', req.body);
    const customer = await getCustomerByName(req.body.name);
    if (!customer) {
      res.status(401).json({message: 'Invalid username or password.'});
      return;
    }

    if (!bcrypt.compareSync(req.body.password, customer.password)) {
      res.status(401).json({message: 'Invalid username or password.'});
      return;
    }

    const customerWithNoPassword = {
      customerId: customer.customerId,
      name: customer.name,
      address: customer.address,
      email: customer.email,
      role: customer.role,
    };

    const token = jwt.sign(customerWithNoPassword, process.env.JWT_SECRET);
    res.json({customer: customerWithNoPassword, token});
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const existingCustomerByName = await getCustomerByName(req.body.name);
    if (existingCustomerByName) {
      res
        .status(400)
        .json({message: 'User with this name or email already exists.'});
      return;
    }

    const existingCustomerByEmail = await getCustomerByEmail(req.body.email);
    if (existingCustomerByEmail) {
      res
        .status(400)
        .json({message: 'User with this name or email already exists.'});
      return;
    }

    const customer = req.body;
    customer.password = bcrypt.hashSync(customer.password, 10);

    const customerWithNoPassword = {
      name: customer.name,
      address: customer.address,
      email: customer.email,
      role: customer.role,
    };

    customer.token = jwt.sign(customerWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '48h',
    });
    const result = await addCustomer(customer);

    if (result.customer_id) {
      res.status(201);
      res.json({message: 'New customer registered.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    console.log('getMe', res.locals.customer);

    if (res.locals.customer) {
      res.json({message: 'token ok', customer: res.locals.customer});
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export {postLogin, getMe, register};
