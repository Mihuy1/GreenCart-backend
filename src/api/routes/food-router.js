import express from 'express';
import {
  getFood,
  getFoodById,
  postFood,
  putFood,
  deleteFood,
} from '../controllers/food-controller.js';

import multer from 'multer';

const foodRouter = express.Router();

foodRouter.route('/').get(getFood).post(postFood);

export default foodRouter;
