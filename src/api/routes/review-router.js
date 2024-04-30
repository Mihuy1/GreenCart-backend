import {authenticationToken} from '../../middlewares.js';
import {
  getReview,
  getReviewById,
  postReview,
  putReview,
  deleteReview,
} from '../controllers/review-controller.js';

import express from 'express';

const reviewRouter = express.Router();

reviewRouter.route('/').get(getReview).post(postReview);
reviewRouter
  .route('/:id')
  .get(authenticationToken, getReviewById)
  .put(authenticationToken, putReview)
  .delete(authenticationToken, deleteReview);

export default reviewRouter;
