import promisePool from '../../utils/database.js';

const listAllProducts = async () => {
  const [rows] = await promisePool.query('SELECT * FROM products');
  console.log('rows', rows);
  return rows;
};

const findProductById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM products WHERE productId = ?',
    [id]
  );
  console.log('rows', rows);
  return rows;
};

const addProduct = async (food) => {
  const {name, description, price, category, image} = food;
  const sql = `INSERT INTO products (name, description, price, category, image)
    VALUES (?, ?, ?, ?, ?)`;
  const params = [name, description, price, category, image].map(
    (arvo) => arvo ?? null
  );
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {food_id: rows[0].insertId};
};

const modifyProduct = async (food, id) => {
  const sql = promisePool.format(`UPDATE products SET ? WHERE productId = ?`, [
    food,
    id,
  ]);

  const rows = await promisePool.execute(sql);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {message: 'success'};
};

const removeProduct = async (id) => {
  const sql = promisePool.format(`DELETE FROM products WHERE productId = ?`, [
    id,
  ]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {
  listAllProducts,
  findProductById,
  addProduct,
  modifyProduct,
  removeProduct,
};
