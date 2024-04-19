import {authenticationToken, isAdmin} from '../../middlewares.js';
import {
  getCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
  deleteCustomer,
} from '../controllers/customer-controller.js';

import express from 'express';

const customerRouter = express.Router();

customerRouter
  .route('/')
  .get(getCustomers)
  .post(authenticationToken, isAdmin, postCustomer);
customerRouter
  .route('/:id')
  .get(getCustomerById)
  .put(authenticationToken, isAdmin, putCustomer)
  .delete(authenticationToken, isAdmin, deleteCustomer);

export default customerRouter;
