import promisePool from '../../utils/database.js';

const listAllOrderItems = async () => {
  const [rows] = await promisePool.query('SELECT * FROM orderItems');
  console.log(rows);
  return rows;
};

const findOrderItemById = async (orderItemId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM orderItems WHERE orderItemId = ?',
    [orderItemId]
  );
  return rows;
};

const addOrderItem = async (orderItem) => {
  const {orderId, productId, quantity} = orderItem;
  const sql = `INSERT INTO orderItems (orderId, productId, quantity)
    VALUES (?, ?, ?)`;
  const params = [orderId, productId, quantity].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);

  console.log('AddOrderItem:', rows[0]);

  if (rows[0].affectedRows === 0) return false;

  return {orderItemId: rows[0].insertId};
};

const modifyOrderItem = async (orderItemId, orderItem) => {
  const {orderId, productId, quantity} = orderItem;
  const sql = `UPDATE orderItems SET orderId = ?, productId = ?, quantity = ? WHERE orderItemId = ?`;
  const params = [orderId, productId, quantity, orderItemId];
  const [rows] = await promisePool.execute(sql, params);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeOrderItem = async (orderItemId) => {
  const sql = promisePool.format(
    `DELETE FROM orderItems WHERE orderItemId = ?`,
    [orderItemId]
  );
  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

const listAllProductsInOrders = async () => {
  const sql = `
    SELECT p.*
    FROM orders o
    JOIN orderItems oi ON o.orderId = oi.orderId
    JOIN products p ON oi.productId = p.productId
  `;
  const [rows] = await promisePool.execute(sql);
  return rows;
};

export {
  listAllOrderItems,
  findOrderItemById,
  addOrderItem,
  modifyOrderItem,
  removeOrderItem,
  listAllProductsInOrders,
};
