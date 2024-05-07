import promisePool from '../../utils/database.js';

const listAllOrders = async () => {
  const [rows] = await promisePool.query('SELECT * FROM orders');
  console.log(rows);
  return rows;
};

const findOrderById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM orders WHERE orderId = ?',
    [id]
  );
  return rows;
};

const addOrder = async (order) => {
  const {customerId, orderDate, price, status_code} = order;
  const sql = `INSERT INTO orders (customerId, orderDate, price, status_code)
    VALUES (?, ?, ?, ?)`;
  const params = [customerId, orderDate, price, status_code].map(
    (arvo) => arvo ?? null
  );
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows.affectedRows === 0) return false;

  return {orderId: rows.insertId};
};

const modifyOrder = async (id, order) => {
  const {customer_id, orderDate, price, status_code} = order;
  console.log('modifyOrder', order);
  const sql = `UPDATE orders SET customerId = ?, orderDate = ?, price = ?, status_code = ? WHERE orderId = ?`;
  const params = [customer_id, orderDate, price, status_code, id];
  const [rows] = await promisePool.execute(sql, params);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeOrder = async (id) => {
  const sql = promisePool.format(`DELETE FROM orders WHERE orderId = ?`, [id]);
  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {listAllOrders, findOrderById, addOrder, modifyOrder, removeOrder};
