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
  console.log('Received order:', order); // Log the received order object
  const {customerId, orderDate, price} = order; // Use correct property names
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('Order Date:', orderDate); // Log the order date
  console.log('Price:', price); // Log the price
  const sql = `INSERT INTO orders (customerId, orderDate, price)
    VALUES (?, ?, ?)`;
  const params = [customerId, orderDate, price].map((arvo) => arvo ?? null);
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows.affectedRows === 0) return false;

  return {orderId: rows.insertId};
};

const modifyOrder = async (id, order) => {
  const {customer_id, orderDate, price} = order;
  const sql = `UPDATE orders SET customerId = ?, orderDate = ?, price = ? WHERE orderId = ?`;
  const params = [customer_id, orderDate, price, id];
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
