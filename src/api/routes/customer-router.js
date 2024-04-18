import {isAdmin} from '../../middlewares.js';
import {
  getCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
  deleteCustomer,
} from '../controllers/customer-controller.js';

import express from 'express';

const customerRouter = express.Router();

customerRouter.route('/').get(getCustomers).post(postCustomer);
customerRouter
  .route('/:id')
  .get(getCustomerById)
  .put(isAdmin, putCustomer)
  .delete(isAdmin, deleteCustomer);

export default customerRouter;