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
  const {name, file} = category;
  console.log('addCategory', name, file);
  const sql = `INSERT INTO categories (name, file) VALUES (?, ?)`;
  const params = [name, file].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);

  if (rows[0].affectedRows === 0) return false;

  return {category_id: rows[0].insertId};
};

const modifyCategory = async (id, category) => {
  const {name, file} = category;
  const sql = `UPDATE categories SET name = ?, SET file = ? WHERE categoryId = ?`;
  const params = [name, file, id];

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
