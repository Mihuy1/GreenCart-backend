import promisePool from '../../utils/database.js';

const listAllShoppingCart = async () => {
  const [rows] = await promisePool.query('SELECT * FROM shoppingCarts');
  console.log(rows);
  return rows;
};

const findShoppingCartById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM shoppingCarts WHERE shoppingCartId = ?',
    [id]
  );
  return rows;
};

const findShoppingCartInfo = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT p.name, p.description, p.price, s.quantity
     FROM shoppingCarts s
     JOIN products p ON s.productId = p.productId
     WHERE s.shoppingCartId = ?`,
    [id]
  );
  return rows;
};

const addShoppingCart = async (shoppingCart) => {
  const {orderId, productId, quantity} = shoppingCart;
  const sql = `INSERT INTO shoppingCarts (orderId, productId, quantity)
    VALUES (?, ?, ?)`;
  const params = [orderId, productId, quantity].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {shoppingCart_id: rows[0].insertId};
};

const modifyShoppingCart = async (id, shoppingCart) => {
  const {orderId, productId, quantity} = shoppingCart;
  const sql = `UPDATE shoppingCarts SET orderId = ?, productId = ?, quantity = ? WHERE shoppingCartId = ?`;
  const params = [orderId, productId, quantity, id];
  const [rows] = await promisePool.execute(sql, params);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeShoppingCart = async (id) => {
  const sql = promisePool.format(
    `DELETE FROM shoppingCarts WHERE shoppingCartId = ?`,
    [id]
  );
  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {
  listAllShoppingCart,
  findShoppingCartById,
  findShoppingCartInfo,
  addShoppingCart,
  modifyShoppingCart,
  removeShoppingCart,
};
