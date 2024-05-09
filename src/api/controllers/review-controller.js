import {
  listAllReviews,
  findReviewById,
  addReview,
  modifyReview,
  removeReview,
} from '../models/review-model.js';

/**
 * @api {get} /reviews Get all reviews
 * @apiName GetReviews
 * @apiGroup Review
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 */
const getReview = async (req, res, next) => {
  try {
    const reviews = await listAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /reviews/:id Get review by ID
 * @apiName GetReviewById
 * @apiGroup Review
 * @apiParam {Number} id Review's unique ID.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
const getReviewById = async (req, res, next) => {
  try {
    const review = await findReviewById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {post} /reviews Add a new review
 * @apiName PostReview
 * @apiGroup Review
 * @apiParam {String} review Review data.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
const postReview = async (req, res, next) => {
  try {
    const result = await addReview(req.body);
    if (result.review_id) {
      res.status(201).json({message: 'New review added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /reviews/:id Update a review
 * @apiName PutReview
 * @apiGroup Review
 * @apiParam {Number} id Review's unique ID.
 * @apiParam {String} review Review data.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
const putReview = async (req, res, next) => {
  try {
    const review = await modifyReview(req.params.id, req.body);
    if (review) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /reviews/:id Delete a review
 * @apiName DeleteReview
 * @apiGroup Review
 * @apiParam {Number} id Review's unique ID.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
const deleteReview = async (req, res, next) => {
  try {
    const review = await removeReview(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export {getReview, getReviewById, postReview, putReview, deleteReview};
