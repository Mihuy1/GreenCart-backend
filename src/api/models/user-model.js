import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM users WHERE id = ?', [
    id,
  ]);
  console.log('rows', rows);
  return rows;
};

const addUser = async (user) => {
  const {username, email, password, role} = user;
  const sql = `INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?)`;
  const params = [username, email, password, role].map((arvo) => arvo ?? null);
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {user_id: rows[0].insertId};
};

const modifyUser = async (id, user) => {
  const {username, email, password, role} = user;
  const sql = `UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
  const params = [username, email, password, role, id];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const sql = promisePool.format(`DELETE FROM users WHERE id = ?`, [id]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
