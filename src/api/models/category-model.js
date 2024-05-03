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

const addCategory = async (category, file) => {
  const {name} = category;
  console.log('addCategory', name, file);
  const sql = `INSERT INTO categories (name, file) VALUES (?, ?)`;
  const params = [name, file.filename].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);

  if (rows[0].affectedRows === 0) return false;

  return {category_id: rows[0].insertId};
};

const modifyCategory = async (category, id) => {
  const sql = promisePool.format(
    `UPDATE categories SET ? WHERE categoryId = ?`,
    [category, id]
  );

  console.log('Modify Category', category, id);

  const rows = await promisePool.execute(sql);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {message: 'success'};
};

/*const modifyCategory = async (id, category) => {
  const sql = `UPDATE categories SET ? WHERE categoryId = ?`;
  const params = [category, id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'successfully modified category'};
};*/

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
