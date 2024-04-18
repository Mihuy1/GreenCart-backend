import {
  getcustomers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/customer-controller.js';

import express from 'express';

const customerRouter = express.Router();

customerRouter.route('/').get(getcustomers).post(postUser);
customerRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default customerRouter;
