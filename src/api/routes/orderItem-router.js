import express from 'express';
import {
  getItem,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../controllers/orderItem-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

const itemRouter = express.Router();

itemRouter.route('/').get(getItem).post(postItem);
itemRouter.route('/:id').get(getItemById).put(putItem).delete(deleteItem);

export default itemRouter;
