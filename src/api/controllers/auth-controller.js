import bcrypt from 'bcrypt';
import {addCustomer, getCustomerByName} from '../models/customer-model.js';
import jwt from 'jsonwebtoken';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const customer = await getCustomerByName(req.body.name);
  if (!customer) {
    res.sendStatus(404);
    return;
  }

  if (!bcrypt.compareSync(req.body.password, customer.password)) {
    res.sendStatus(401);
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
};

const register = async (req, res) => {
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
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.customer);

  if (res.locals.customer) {
    res.json({message: 'token ok', customer: res.locals.customer});
  } else {
    res.sendStatus(404);
  }
};

export {postLogin, getMe, register};
