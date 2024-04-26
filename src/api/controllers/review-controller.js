import {
  listAllReviews,
  findReviewById,
  addReview,
  modifyReview,
  removeReview,
} from '../models/review-model.js';

const getReview = async (req, res, next) => {
  try {
    const reviews = await listAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

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
