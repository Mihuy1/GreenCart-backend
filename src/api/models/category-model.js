import promisePool from '../../utils/database.js';

const listAllCategories = async () => {
  const [rows] = await promisePool.query('SELECT * FROM categories');
  console.log('rows', rows);
  return rows;
};

const findCategoryById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM categories WHERE categoryId = ?',
    [id]
  );
  console.log('rows', rows);
  return rows;
};

const addCategory = async (category) => {
  const {name} = category;
  const sql = `INSERT INTO categories (name) VALUES (?)`;
  const params = [name].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);

  if (rows[0].affectedRows === 0) return false;

  return {category_id: rows[0].insertId};
};

const modifyCategory = async (id, category) => {
  const {name} = category;
  const sql = `UPDATE categories SET name = ? WHERE categoryId = ?`;
  const params = [name, id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'successfully modified category'};
};

const removeCategory = async (id) => {
  const sql = promisePool.format(
    `DELETE FROM categories WHERE categoryId = ?`,
    [id]
  );

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'successfully removed category'};
};

export {
  listAllCategories,
  findCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
};
