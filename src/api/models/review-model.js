import promisePool from '../../utils/database.js';

const listAllReviews = async () => {
  const [rows] = await promisePool.query('SELECT * FROM reviews');

  return rows;
};

const findReviewById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM reviews WHERE reviewId = ?',
    [id]
  );

  return rows;
};

const addReview = async (review) => {
  const {customerId, orderId, rating} = review;
  const sql = `INSERT INTO reviews (customerId, orderId, rating)
    VALUES (?, ?, ?)`;
  const params = [customerId, orderId, rating].map((arvo) => arvo ?? null);

  const rows = await promisePool.execute(sql, params);

  if (rows[0].affectedRows === 0) return false;

  return {review_id: rows[0].insertId};
};

const modifyReview = async (id, review) => {
  const {customerId, orderId, rating} = review;
  const sql = `UPDATE reviews SET customerId = ?, orderId = ?, rating = ? WHERE reviewId = ?`;
  const params = [customerId, orderId, rating, id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'successfully modified review'};
};

const removeReview = async (id) => {
  const sql = promisePool.format(`DELETE FROM reviews WHERE reviewId = ?`, [
    id,
  ]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'successfully removed review'};
};

export {listAllReviews, findReviewById, addReview, modifyReview, removeReview};
