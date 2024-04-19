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
  .get(getReviewById)
  .put(putReview)
  .delete(deleteReview);

export default reviewRouter;
