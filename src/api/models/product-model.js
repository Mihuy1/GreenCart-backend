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

const addProduct = async (product) => {
  const {name, description, price, image, categoryId} = product;
  const sql = `INSERT INTO products (name, description, price, image, categoryId)
    VALUES (?, ?, ?, ?, ?)`;
  const params = [name, description, price, image, categoryId].map(
    (arvo) => arvo ?? null
  );
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {product_id: rows[0].insertId};
};

const modifyProduct = async (product, id) => {
  const sql = promisePool.format(`UPDATE products SET ? WHERE productId = ?`, [
    product,
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
