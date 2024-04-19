import express from 'express';
import {
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
} from '../controllers/category-controller.js';
import {authenticationToken, isAdmin} from '../../middlewares.js';

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(getCategory)
  .post(authenticationToken, isAdmin, postCategory);
categoryRouter
  .route('/:id')
  .get(getCategoryById)
  .put(authenticationToken, isAdmin, putCategory)
  .delete(authenticationToken, isAdmin, deleteCategory);

export default categoryRouter;
