import promisePool from '../../utils/database.js';

const listAllcustomers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM customers');
  console.log('rows', rows);
  return rows;
};

const findCustomerById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM customers WHERE customerId = ?',
    [id]
  );
  console.log('rows', rows);
  return rows;
};

const addCustomer = async (user) => {
  const {name, address, email, password, role} = user;
  const sql = `INSERT INTO customers (name, address, email, password, role)
    VALUES (?, ?, ?, ?, ?)`;
  const params = [name, address, email, password, role].map(
    (arvo) => arvo ?? null
  );
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {customer_id: rows[0].insertId};
};

const modifyCustomer = async (id, user) => {
  const {name, address, email, password, role} = user;
  const sql = `UPDATE customers SET name = ?, address = ?, email = ?, password = ?, role = ? WHERE customerId = ?`;
  const params = [name, address, email, password, role, id];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCustomer = async (id) => {
  const sql = promisePool.format(`DELETE FROM customers WHERE customerId = ?`, [
    id,
  ]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

const getCustomerByName = async (name) => {
  const sql = `SELECT * FROM customers WHERE name = ?`;
  const params = [name];
  const [rows] = await promisePool.execute(sql, params);
  if (rows.length === 0) return false;

  return rows[0];
};

export {
  listAllcustomers,
  findCustomerById,
  addCustomer,
  modifyCustomer,
  removeCustomer,
  getCustomerByName,
};
