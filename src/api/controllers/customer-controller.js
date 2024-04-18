import {
  listAllcustomers,
  findCustomerById,
  modifyCustomer,
  removeCustomer,
  addCustomer,
} from '../models/customer-model.js';

const getcustomers = async (req, res) => {
  res.json(await listAllcustomers());
};

const getUserById = async (req, res) => {
  const user = await findCustomerById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  console.log('postUser', req.body);
  const result = await addCustomer(req.body);
  if (result.customer_id) {
    res.status(201);
    res.json({message: 'New customer added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const result = await modifyCustomer(req.params.id, req.body);
  if (result) {
    res.status(200);
    res.json({message: 'Customer updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const result = await removeCustomer(userId);

  if (result) {
    res.status(200);
    res.json({message: 'Customer deleted succesfully'});
  } else {
    res.status(404);
  }
};

export {getcustomers, getUserById, postUser, putUser, deleteUser};
