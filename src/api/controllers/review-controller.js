import {
  listAllReviews,
  findReviewById,
  addReview,
  modifyReview,
  removeReview,
} from '../models/review-model.js';

const getReview = async (req, res) => {
  res.json(await listAllReviews());
};

const getReviewById = async (req, res) => {
  const review = await findReviewById(req.params.id);

  if (review) {
    res.json(review);
  } else {
    res.sendStatus(404);
  }
};

const postReview = async (req, res) => {
  const result = await addReview(req.body);

  if (result.review_id) {
    res.status(201);
    res.json({message: 'New review added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putReview = async (req, res) => {
  const review = await modifyReview(req.params.id, req.body);

  if (review) {
    res.json(review);
  } else {
    res.sendStatus(404);
  }
};

const deleteReview = async (req, res) => {
  const review = await removeReview(req.params.id);

  if (review) {
    res.json(review);
  } else {
    res.sendStatus(404);
  }
};

export {getReview, getReviewById, postReview, putReview, deleteReview};
